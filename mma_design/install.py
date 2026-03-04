# Copyright (c) 2023, MMA and contributors
# For license information, please see license.txt

import frappe


def after_install():
	"""Seed Home Page records from Workspace after mma_design is installed."""
	seed_home_pages()


def seed_home_pages():
	"""
	Create Home Page records from existing Frappe Workspace doctype.
	Idempotent: skips workspaces that already have a matching Home Page.
	"""
	if not frappe.db.exists("DocType", "Workspace"):
		return

	workspaces = frappe.get_all(
		"Workspace",
		fields=["name", "title", "module", "icon", "sequence_id"],
		filters={"public": 1},
		order_by="sequence_id asc",
		ignore_permissions=True,
	)

	default_colors = [
		"#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
		"#14b8a6", "#06b6d4", "#3b82f6", "#f59e0b",
	]

	for idx, ws in enumerate(workspaces):
		label = (ws.title or ws.name).strip()
		if not label or frappe.db.exists("Home Page", label):
			continue

		try:
			doc = frappe.new_doc("Home Page")
			doc.label = label
			doc.module = ws.module or "Home"
			doc.icon = ws.icon or "folder"
			doc.color = default_colors[idx % len(default_colors)]
			doc.sequence_id = ws.sequence_id or (idx + 1)
			doc.public = 1

			ws_doc = frappe.get_doc("Workspace", ws.name)
			shortcuts = getattr(ws_doc, "shortcuts", None) or []
			for sc in shortcuts[:5]:
				link_to = getattr(sc, "link_to", None) or getattr(sc, "label", None)
				if link_to:
					doc.append("home_shortcut", {
						"type": getattr(sc, "type", "DocType") or "DocType",
						"link_to": link_to,
						"label": getattr(sc, "label", None) or link_to,
					})

			if not doc.home_shortcut:
				doc.append("home_shortcut", {
					"type": "DocType",
					"link_to": "ToDo",
					"label": label,
				})

			doc.insert(ignore_permissions=True)
			frappe.db.commit()
		except Exception as e:
			frappe.db.rollback()
