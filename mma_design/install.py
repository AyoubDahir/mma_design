# Copyright (c) 2023, MMA and contributors
# For license information, please see license.txt

import frappe

ICON_MAP = {
	"Home": "fa-home",
	"Settings": "fa-cogs",
	"Accounting": "fa-money-check-alt",
	"Buying": "fa-shopping-cart",
	"Selling": "fa-hand-holding-usd",
	"Stock": "fa-warehouse",
	"Manufacturing": "fa-industry",
	"Assets": "fa-building",
	"Projects": "fa-project-diagram",
	"CRM": "fa-bullseye",
	"Support": "fa-headset",
	"HR Module": "fa-users-cog",
	"Human Resources": "fa-users-cog",
	"Payroll": "fa-file-invoice-dollar",
	"Quality": "fa-clipboard-check",
	"Healthcare": "fa-heartbeat",
	"Website": "fa-globe",
	"Loans": "fa-hand-holding-usd",
	"Users": "fa-user-shield",
	"Build": "fa-tools",
	"Tools": "fa-wrench",
	"ERPNext Settings": "fa-sliders-h",
	"ERPNext Integrations": "fa-plug",
	"Utilities": "fa-toolbox",
	"Cashier": "fa-cash-register",
	"Leaderboard": "fa-star",
}

COLOR_MAP = {
	"Home": "#6366f1",
	"Settings": "#ef4444",
	"Accounting": "#8b5cf6",
	"Buying": "#ec4899",
	"Selling": "#14b8a6",
	"Stock": "#06b6d4",
	"Manufacturing": "#3b82f6",
	"Assets": "#6366f1",
	"Projects": "#14b8a6",
	"CRM": "#8b5cf6",
	"Support": "#ec4899",
	"Quality": "#f59e0b",
	"Healthcare": "#6366f1",
	"Website": "#06b6d4",
	"Loans": "#14b8a6",
	"Users": "#8b5cf6",
	"Build": "#f59e0b",
	"Tools": "#8b5cf6",
	"Cashier": "#ec4899",
	"Leaderboard": "#f59e0b",
}

DEFAULT_COLORS = [
	"#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
	"#14b8a6", "#06b6d4", "#3b82f6", "#f59e0b",
]


def after_install():
	"""Seed Home Page records from Workspace after mma_design is installed."""
	seed_home_pages()


def seed_home_pages():
	"""
	Create or update Home Page records from existing Frappe Workspace doctype.
	Idempotent — safe to run on every deployment:
	  - Creates missing Home Pages from Workspaces
	  - Updates icons and colors on existing Home Pages from the maps above
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

	for idx, ws in enumerate(workspaces):
		label = (ws.title or ws.name).strip()
		if not label:
			continue

		icon = ICON_MAP.get(label, "fa-folder")
		color = COLOR_MAP.get(label, DEFAULT_COLORS[idx % len(DEFAULT_COLORS)])

		if frappe.db.exists("Home Page", label):
			try:
				existing = frappe.get_doc("Home Page", label)
				changed = False
				if existing.icon != icon:
					existing.icon = icon
					changed = True
				if existing.color != color:
					existing.color = color
					changed = True
				if changed:
					existing.save(ignore_permissions=True)
					frappe.db.commit()
			except Exception:
				frappe.db.rollback()
			continue

		try:
			doc = frappe.new_doc("Home Page")
			doc.label = label
			doc.module = ws.module or "Home"
			doc.icon = icon
			doc.color = color
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
		except Exception:
			frappe.db.rollback()
