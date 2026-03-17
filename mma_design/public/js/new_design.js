const openMenuFirstPageIcon = document.querySelector(
	"[data-first-page-open-nav]"
  )
  const closeMenuFirstPageIcon = document.querySelector(".close_mennu")

  function getSafeNavData() {
	const raw = localStorage.getItem("navdata");
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch (e) {
		return [];
	}
  }
  
  function openFirstPageNav() {
	let navbardata = getSafeNavData()
	console.log("navbardata", navbardata)
  
	const menuFirstPage = document.querySelector("[data-menu-first-page]")
	menuFirstPage.classList.add("open-menu")
  }
  
  function closeFirstPageNav() {
	const menuFirstPage = document.querySelector("[data-menu-first-page]")
	menuFirstPage.classList.remove("open-menu")
  }

function get_pages() {
    frappe.xcall("frappe.desk.desktop.get_workspace_sidebar_items")
.then(r => {
   var arr = Array(r.pages[0].content)
   
   r.pages.forEach((element , index) => {
       
       if(element.name != "Home"){
           frappe.db.get_doc("Workspace" ,element.name).then(res => {
               if(res.shortcuts.length > 0){
           var listitmes = ``
             
       res.shortcuts.forEach(el => {
          
           //  alert(el.label)
               if(el.type == "DocType"){
            listitmes += `<li><a href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a></li>`
               }
              
            } )
           
           
           
           $(`<li><a class="sidebar-sub-toggle "><svg class="icon md" style = "color:white">
           <use  fill="white" stroke="white"   href="#icon-${element.icon}"></use>
       </svg> ${element.name} <span class="sidebar-collapse-icon ti-angle-down"></span></a>
   <ul>
  
     
           
       ${listitmes}
      
   </ul>
</li>


`).appendTo('.sideitems')
   }
       
       })
       }
       // console.log(element)
   });


})
  
}
// function make_cust_nav_bar(navbardata) {
	
// 	// toolbar
// 	// if (frappe.boot && frappe.boot.home_page !== "setup-wizard") {
// 	// 	frappe.frappe_toolbar = new frappe.ui.toolbar.Toolbar();
// 	// }
// // if(this.navbardata){
	
// 		let navitems = ``
// 		let dropDownitems = ``
// 		let moredropDownitems = ``
// 		// let me = this
// 		// alert("ok")
// 		navbardata.forEach((el , index) => {
	   
// 		//  alert(el.label)
		
// 			if(el.type == "DocType" && el.doc_view !== "List"){
// 				if (index > 10){
// 					moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a>`

// 				}
// 				else{
// 					navitems += `<a class="nav-link nav-item" href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a>`
		
// 				}
// 			}
// 			else if(el.type == "DocType" && el.doc_view == "List"){

// 				// alert(el.label)
// 			if (index > 10){
// 					moredropDownitems +=`<a class="dropdown-item " href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a>`

// 				}
// 				else{
// 				navitems += `<a class="nav-link nav-item" href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a>`
// 			// alert(navitems)	
// 				}   
// 			}
// 			else if (el.type == "Page" ){
// 				if (index > 10){
// 					moredropDownitems +=`<a class="dropdown-item " href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a>`

// 				}
// 				else{
// 				navitems += `<a class="nav-link nav-item" href="/app/${el.link_to.replace(/\s/g , "-").toLowerCase()}">${el.label}</a>`
// 				}
// 			}

// 			else if(el.type == "Report"){
// 				// navitems += `<a class="nav-link nav-item" href="/app/${el.label.replace(" " , "-").toLowerCase()}/view/report">${el.label}</a>`
				   
// 				dropDownitems += `<a class="dropdown-item" href="/app/query-report/${el.link_to}">${el.label}</a>`
// 				// console.log(dropDownitems)
// 			}
		   
// 		 } )

// if(moredropDownitems){
// 			navitems += `
// 			<div class="dropdown nav-item">
// 	 <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 	   More
// 	 </a>
// 	 <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
// 	  ${moredropDownitems}
	  
// 	 </div>
//    </div>
// 			`
//    }
// if(dropDownitems){
// 		 navitems += `
// 		 <div class="dropdown nav-item">
//   <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Reports
//   </a>
//   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//    ${dropDownitems}
   
//   </div>
// </div>
// 		 `
// }


// 		//  alert('ok')
// 	navbar = `

// 	<div class="overlay" data-overlay-first-page></div>
// 	<div class="overlay" data-overlay-first-page></div>
// 	<div class="menu" data-menu-first-page>
// 	  <div class="profile__img__close__nav">
// 		<div class="menu_profile__image__name">
// 		  <!-- <div class="menu_profile__image">
// 			<img src="./assests/images/profile-imp.png" alt="profile_img" />
// 		  </div> -->
// 		  <span class="menu_name">Cashier 1</span>
// 		</div>
// 		<div class="close__navbar__icon" data-first-page-close-nav>
// 		  <i class="fa fa-x"></i>
// 		</div>
// 	  </div>
	
// 	  <div class="menu__companies">
	  
// 		<span class="companies__title">Cashiers</span>
// 		<span class="companies__title">Ivoice</span>
// 		<span class="companies__title">IPD</span>
// 		<span class="companies__title">OPD</span>
// 		<span class="companies__title">Bill</span>
// 		<span class="companies__title">Reporting</span>
// 		<span class="companies__title">Config</span>
// 		<span class="companies__title">Cashiers</span>
// 		<span class="companies__title">Cashiers</span>
// 	  </div>
	
	  
	
// 	  <div class="menu__profile">
// 		<span>My Profile</span>
	   
// 		<span>Log out</span>
// 	  </div>
// 	</div>
// 	<header class="header">
// 	  <div class="logo__navlinks">
// 		<!-- logo -->
// 		<a class="mylogo nav-link icon" href="/app" data-logo>
// 		<i class="fa fa-home"></i>
// 		</a> 

		
		
// 		${navitems}
	
// 	<!--	<a class="nav-link nav-item" href="#">Configuration</a>  -->
// 	  </div>
	 
		
		
// 		<div class="profile__image__name mr-3">
// 		  <div class="profile__image">
			
// 		  </div>
// 		  <span class="nav-link nav-item">${frappe.boot.user.first_name}</span>
// 		  <button class="ml-3 mr-5  btn nav-link nav-item" onclick = "frappe.app.logout()">Logout</button>
// 		  <div class="dropdown nav-item">
// 		  <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
// 			My Profile
// 		  </a>
// 		  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">		  
// 		  <button class="dropdown-item" onclick="frappe.ui.toolbar.route_to_user()">My Settings</button>
// 		  <button class="dropdown-item" onclick="frappe.ui.toolbar.clear_cache()">Reload</button>
		  
// 		  </div>
// 		</div>
		  	

// 		</div>
// 		<div class="open-navbarbtn" data-first-page-open-nav onclick = "openFirstPageNav()">
// 		  <i class="fa fa-bars"></i>
// 		</div>
// 	  </div>








	
// 	</header>
	
	

// 		`

// // 		<div class="notification__icon" data-notify-icon>
// // 	<a class="nav-link icon" href="#"
// // 	  ><i class="fa fa-bell"></i
// // 	></a>
// // 	<span class="notification__icon__indicator">7</span>
// //   </div>
// return navbar
	   
		
// 	// }
// // }
// }

function make_cust_nav_bar(navbardata) {
	let navitems = ``
	let dropDownitems = ``
	let moredropDownitems = ``
	let reportGroups = {}
  
	// desktop (links)
	navbardata.forEach((el, index) => {
	  if (el.type == "DocType" && el.doc_view !== "List") {
		if (index > 10) {
		  moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to
			.replace(/\s/g, "-")
			.toLowerCase()}">${el.label}</a>`
		} else {
		  navitems += `<a class="nav-link nav-item" href="/app/${el.link_to
			.replace(/\s/g, "-")
			.toLowerCase()}">${el.label}</a>`
		}
	  } else if (el.type == "DocType" && el.doc_view == "List") {
		if (index > 10) {
		  moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to
			.replace(/\s/g, "-")
			.toLowerCase()}">${el.label}</a>`
		} else {
		  navitems += `<a class="nav-link nav-item" href="/app/${el.link_to
			.replace(/\s/g, "-")
			.toLowerCase()}">${el.label}</a>`
		}
	  } else if (el.type == "Page") {
		if (index > 10) {
		  moredropDownitems += `<a class="dropdown-item " href="/app/${el.link_to
			.replace(/\s/g, "-")
			.toLowerCase()}">${el.label}</a>`
		} else {
		  navitems += `<a class="nav-link nav-item" href="/app/${el.link_to
			.replace(/\s/g, "-")
			.toLowerCase()}">${el.label}</a>`
		}
	  } else if (el.type == "Insights Dashboard") {
		if (index > 10) {
		  moredropDownitems += `<a class="dropdown-item " href="/insights/public/dashboard/${el.dashboard_link}" , target= "_blank">${el.label}</a>`
		} else {
		  navitems += `<a class="nav-link nav-item" href="/insights/public/dashboard/${el.dashboard_link}" target= "_blank">${el.label}</a>`
		}
	  } else if (el.type == "Report") {
		// navitems += `<a class="nav-link nav-item" href="/app/${el.label
		//   .replace(" ", "-")
		//   .toLowerCase()}/view/report">${el.label}</a>`
		if (el.group) {
		  if (!reportGroups[el.group]) {
			reportGroups[el.group] = ``
			reportGroups[
			  el.group
			] += `<a class="dropdown-item" href="/app/query-report/${el.link_to}">${el.label}</a>`
		  } else {
			reportGroups[
			  el.group
			] += `<a class="dropdown-item" href="/app/query-report/${el.link_to}">${el.label}</a>`
		  }
		} else {
		  dropDownitems += `<a class="dropdown-item" href="/app/query-report/${el.link_to}">${el.label}</a>`
		}
	  }
	})
	let reportsMenu = ``
	for (var key in reportGroups) {
	  // Access the property value using data[key]
	  // console.log("Key: " + key);
	  reportsMenu += `
		  <div class="dropdown nav-item">
		  <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			${key}
		  </a>
		  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		   ${reportGroups[key]}
		   
		  </div>
		</div>
			 `
	}
  
	if (moredropDownitems) {
	  navitems += `
			  <div class="dropdown nav-item">
	   <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		 More
	   </a>
	   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		${moredropDownitems}
		
	   </div>
	 </div>
			  `
	}
	if (reportsMenu) {
	  navitems += reportsMenu
	}
	if (dropDownitems) {
	  navitems += `
		   <div class="dropdown nav-item">
	<a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	  Reports
	</a>
	<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	 ${dropDownitems}
	 
	</div>
  </div>
		   `
	}
  
	// mobile menu (links)
	let mobile_links = ""
	let report_links = ""
  // Loop through navbardata
  navbardata.forEach((el) => {
	// Generate DocType links
	if (el.type === "DocType") {
	  mobile_links += `
		<a class="companies__title" onclick="closeFirstPageNav()" href="/app/${el.link_to
		  .replace(/\s/g, "-")
		  .toLowerCase()}">${el.label}</a>`;
	}
	if (el.type === "Page") {
	  mobile_links += `
		<a class="companies__title" onclick="closeFirstPageNav()" href="/app/${el.link_to
		  .replace(/\s/g, "-")
		  .toLowerCase()}">${el.label}</a>`;
	}
  
	if (el.type === "Insights Dashboard") {
	  mobile_links += `
		<a class="companies__title" href="/insights/public/dashboard/${el.dashboard_link}">${el.label}</a>`;
  
	  // frappe.set_route(
	  //   `/insights/public/dashboard/${doc.home_shortcut[0].dashboard_link}`
	  // )
	} 
  
	// Collect Report links into report_links
	if (el.type === "Report") {
	  report_links += `
		<a class="dropdown-item" onclick="closeFirstPageNav()" href="/app/query-report/${el.link_to}">
		  ${el.label}
		</a>`;
	}
  });
  
  // Create a single dropdown for Reports
  if (report_links) {
	mobile_links += `
	  <div class="dropdown">
		<a style="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		  Reports
		</a>
		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		  ${report_links}
		</div>
	  </div>`;
  }
  
	  navbar = `
	  <div class="overlay" data-overlay-first-page></div>
	  <div class="overlay" data-overlay-first-page></div>
	  <div class="menu" data-menu-first-page>
		<div class="profile__img__close__nav">
		<div class="menu_profile__image__name">
		  <!-- <div class="menu_profile__image">
		  <img src="./assests/images/profile-imp.png" alt="profile_img" />
		  </div> -->
	  
		</div>
		<div class="close__navbar__icon" data-first-page-close-nav>
		  <i class="fa fa-x"></i>
		</div>
		</div>
	  
		<div class="menu__companies">
		
		<span class="close_mennu" onclick="closeFirstPageNav()">Close</span>
	
	   
	 
  
	 ${mobile_links}  
		</div>
	  
		
	  
		<div class="menu__profile">
  
	  
	   
	  <div class="dropdown">
		<a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		My Profile
		</a>
		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">		  
		 <button class="dropdown-item" onclick="frappe.ui.toolbar.route_to_user()">My Settings</button>
		 <button class="dropdown-item" onclick="frappe.ui.toolbar.clear_cache()">Reload</button>
	   </div>  
	  </div>  
	 
		<button class="btn border border-white text-white" onclick="frappe.app.logout()">Log out</button>
		</div>
	  </div>
	  <header class="header">
		<div class="logo__navlinks">
		<!-- logo -->
		<a class="mylogo nav-link icon" onclick='window.location.reload()' href="/app" data-logo>
		<i class="fa fa-home"></i>
		</a> 
		${navitems}
		</div>
	   
		
		
		<div class="profile__image__name mr-3">
		  <div class="profile__image">
		  </div>
		  <span class="nav-link nav-item">${frappe.boot.user.first_name}</span>
		  <button class="ml-3 mr-5  btn nav-link nav-item" onclick = "frappe.app.logout()">Logout</button>
	  <div class="dropdown nav-item">
		  <a style ="color:#fff" class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		  My Profile
		  </a>
		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">		  
		  <button class="dropdown-item" onclick="frappe.ui.toolbar.route_to_user()">My Settings</button>
		  <button class="dropdown-item" onclick="frappe.ui.toolbar.clear_cache()">Reload</button>
		</div>
	  </div>
			
	
		</div>
		<div class="open-navbarbtn" data-first-page-open-nav onclick = "openFirstPageNav()">
		  <i class="fa fa-bars"></i>
		</div>
		</div>
  
	 
  
	
	  </header>
	  `
	return navbar
  }

function get_notification(){
	frappe.db.get_list("Nofication" , {limit : 1000})
	.then(r => {
		// $('#notif_count').html(r.length)
		// alert(r.length)
	})
}


function make_header_nav(data){

	let navhtml = 	make_cust_nav_bar(data)
	
	if (frappe.boot && frappe.boot.home_page !== "setup-wizard"  ) {
		let route  = window.location.href
		// alert(window.location.href)
		// if(route !== "http://localhost/app" &&  route !== "http://localhost/app/home" ){
			 // frappe.frappe_toolbar = new frappe.ui.toolbar.Toolbar();
		// alert(frappe.session.user)
		// console.log(frappe.boot)
		
		$(navhtml).prependTo($('.header_sec').empty());
		// $('.header_sec').empty('')
		// $(navhtml).appendTo('.header_sec')
		// let awesome_bar = new frappe.search.AwesomeBar();
		//  awesome_bar.setup("#navbar-search");
		// }
	}
}

if(localStorage.getItem('navdata') === null ){
	localStorage.setItem("navdata", JSON.stringify([]));
}
if (!window.mmaOriginalPageClass) {
	window.mmaOriginalPageClass = frappe.ui.Page;
}

frappe.ui.Page = class Page extends window.mmaOriginalPageClass {
	constructor(opts) {
		super(opts);

		let navbardata = getSafeNavData();
	
		frappe.ui.pages[frappe.get_route_str()] = this;
		
		if (this.title !== "Workspace") {
			if (!window.mmaNoticeBound) {
				frappe.realtime.on('new_notice', (data) => {
					frappe.show_alert('New Notication ', 10);
					setTimeout(() => {
						get_notification();
					}, 100);
				});
				window.mmaNoticeBound = true;
			}
			make_header_nav(navbardata);
			get_notification();
		}
	}

	add_main_section() {
		// Use standard frappe logic 
		super.add_main_section();
		
		// Inject custom UI elements into the standard Frappe wrapper
		if (this.wrapper) {
			this.wrapper.find(".layout-side-section").addClass("hide");
			// Append FAB button if missing
			if (this.wrapper.find(".btn-group-fab").length === 0) {
				const mainSection = this.wrapper.find(".row.layout-main");
				if (mainSection.length) {
					mainSection.append('<div class="btn-group-fab" role="group" aria-label="FAB Menu"></div>');
				}
			}
		}
	}
};
// let navbardata = [{"title" : "OPD Orders" , "type" : "DocType"}, {"title" : "IPD Order" , "type" : "DocType"} , {"title" : "Que" , "type" : "DocType"}]
	
frappe.Application  = class extends frappe.Application {

	constructor() {
    super();
    this.make()
	
	}
	

	make() {
        
    // $(` <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css">`).appendTo("head")
    // $(`<div class="col-lg-2 layout-sidebar-section"></div>`).appendTo("#body")
    // make_side()
    // get_pages()
    // sidebar_togg()
	// this.make_nav_bar()

  }
  make_nav_bar() {
$('<div class = "header_sec"> </div>').appendTo('header')
	
  }


}

frappe.views.Workspace = class customWorkspace {
    constructor(wrapper) {
		this.wrapper = $(wrapper);
		this.page = wrapper.page;
        this.title =  "Home"
        // Remove full-width class when navigating away from launchpad
        frappe.router.on('change', () => {
            var r = frappe.router.current_route
            if (r && r[1] && r[1] !== 'workspace') {
                $('body').removeClass('st-launchpad-visible')
            }
        })
        // this.prepare_container()
    }
    show() {
        // $('.navbar').css('display' , 'none')
    //    alert("ok and")
        $('.page-head').hide()
		$('.header_sec').hide()
        // alert("ok")
	
		get_notification()
		
        
        //  this.body =  
      
        this.page.main.empty()
        var me = this

        frappe.call({
            // method: "mma_design.api.template.get_html", //dotted path to server method
            method: "mma_design.api.template.app_page", 
            callback: function(r) {
                // code snippet
                // alert("ol 2")
                // console.log("this is from python " ,r.message)
                var body = r.message[0]
                // console.log(r.message[1])
                $(body).appendTo(me.page.main)
                $('body').addClass('st-launchpad-visible')
				$('.app_btn').click(function(e) {
					// alert( "Handler for .click() called." );
					// console.log(e.currentTarget.id)
					// alert(e.currentTarget.id)
					frappe.db.get_doc('Home Page', `${e.currentTarget.id}`)
					.then(doc => {
						
						let navbardata = doc.home_shortcut
						//  navbardata.unshift({"label" : doc.name , "type" : "DocType" , "link_to" : doc.name})
						// console.log(doc.shortcuts[0].label)
						localStorage.removeItem("navdata")
						localStorage.setItem("navdata", JSON.stringify(navbardata));
						make_header_nav(navbardata)
						$('body').removeClass('st-launchpad-visible')
						if (doc.home_shortcut && doc.home_shortcut.length && doc.home_shortcut[0].link_to) {
							frappe.set_route(`/app/${doc.home_shortcut[0].link_to.replace(/\s/g , "-").toLowerCase()}`)
						} else {
							frappe.set_route('/app')
						}
						$('.header_sec').show()
						$('.page-head').show()
						// let app = new frappe.ui.Page()
						// make_header_nav(navbardata)
					
						// console.log(doc.shortcuts)
					
					})
				  });
        //         frappe.require(['/assets/mma_design/js/lib/highcharts/code/highcharts.js' ,'/assets/mma_design/js/lib/highcharts/code/modules/exporting.js','/assets/mma_design/js/lib/highcharts/code/modules/export-data.js' ], () => {
        //             // alert("ok ")
        //            // Income vs Expense
        //         Highcharts.chart('containerchart', {
        //             chart: {
        //             type: 'spline'
        //             },
        //             title: {
        //             text: 'Income Vs Expense'
        //             },
        //             subtitle: {
        //             text: 'Year 2022'
        //             },
        //             xAxis: {
        //             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        //                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //             accessibility: {
        //                 description: 'Months of the year'
        //             }
        //             },
        //             yAxis: {
        //             title: {
        //                 text: 'Amount'
        //             },
        //             labels: {
        //                 // formatter: function () {
        //                 // return this.value + '°';
        //                 // }
        //             }
        //             },
        //             tooltip: {
        //             crosshairs: true,
        //             shared: true
        //             },
        //             plotOptions: {
        //             spline: {
        //                 marker: {
        //                 radius: 4,
        //                 lineColor: '#666666',
        //                 lineWidth: 1
        //                 }
        //             }
        //             },
        //             series: [{
        //             name: 'Income',
        //             marker: {
        //                 symbol: 'square'
        //             },
        //             lineColor:"#0f0",
        //             data : r.message[1][0]['inc']
        //             // data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 26.4, 22.8, 17.5, 12.1, 7.6]
                
        //             }, {
        //             name: 'Expense',
        //             lineColor:"#f00",
        //             marker: {
        //                 symbol: 'diamond'
        //             },
        //             data : r.message[1][0]['exp']
        //             // data: [1.5, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
        //             }]
        //         });




        //                   // Create the chart
        // Highcharts.chart('pichart', {
        //     chart: {
        //       type: 'pie'
        //     },
        //     title: {
        //       text: 'Balance Sheet'
        //       },
          
        //     accessibility: {
        //       announceNewData: {
        //         enabled: true
        //       },
        //       point: {
        //         valueSuffix: '$'
        //       }
        //     },
          
        //     plotOptions: {
        //       series: {
        //         dataLabels: {
        //           enabled: true,
        //           format: '{point.name}: ${point.y:.1f}'
        //         }
        //       }
        //     },
          
        //     tooltip: {
        //       headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //       pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        //     },
          
        //     series: [
        //       {
        //         name: "Browsers",
        //         colorByPoint: true,
        //         data: r.message[2]
                
        //         // [
        //         //   {
        //         //     name: "Chrome",
        //         //     y: 61.04,
        //         //     drilldown: "Chrome"
        //         //   },
        //         //   {
        //         //     name: "Safari",
        //         //     y: 9.47,
        //         //     drilldown: "Safari"
        //         //   },
        //         //   {
        //         //     name: "Edge",
        //         //     y: 0.0,
        //         //     drilldown: "Edge"
        //         //   },
        //         //   {
        //         //     name: "Firefox",
        //         //     y: 8.15,
        //         //     drilldown: "Firefox"
        //         //   },
        //         //   {
        //         //     name: "Other",
        //         //     y: 11.02,
        //         //     drilldown: null
        //         //   }
        //         // ]
        //       }
        //     ],
          
        //   });
               
        
        //          })
            }
        });
        // frappe.xcall("mma_design.api.template.get_html")
        // .then(r => {
        //     console.log('this is from python',r.message)
        //  $(frappe.render_template(r.message)).appendTo(this.page.main)
        // })
       
      
        // make_side()
        // sidebar_togg()
        // get_pages()
        
       
    }
    prepare_container() {
		// let list_sidebar = $(`
		// 	<div class="list-sidebar overlay-sidebar hidden-xs hidden-sm">
		// 		<div class="desk-sidebar list-unstyled sidebar-menu"></div>
		// 	</div>
		// `).appendTo(this.wrapper.find(".layout-side-section"));
		// this.sidebar = list_sidebar.find(".desk-sidebar");
		// this.body = this.wrapper.find(".layout-main-section");
	}
  
	// let openMenuFirstPageIcon = document.querySelector(
	// 	"[data-first-page-open-nav]"
	//   );
	//   const closeMenuFirstPageIcon = document.querySelector(
	// 	"[data-first-page-close-nav]"
	//   );
	//   const menuFirstPage = document.querySelector("[data-menu-first-page]");
	//   const overlayFirstPage = document.querySelector("[data-overlay-first-page]");
	//   const dataTable = document.querySelector("[data-table-sec]");
	  
	
	  
	  
  





}


// const openMenuFirstPageIcon = document.querySelector(
// 	"[data-first-page-open-nav]"
//   );
//   const closeMenuFirstPageIcon = document.querySelector(
// 	"[data-first-page-close-nav]"
//   );
//   const menuFirstPage = document.querySelector("[data-menu-first-page]");
//   const overlayFirstPage = document.querySelector("[data-overlay-first-page]");
//   const dataTable = document.querySelector("[data-table-sec]");
  
//   function openFirstPageNav() {
// 	menuFirstPage.classList.add("open-menu");
// 	overlayFirstPage.classList.add("open-overlay");
// 	// dataTable.style.display = "none";
//   }
  
//   function closeFirstPageNav() {
// 	menuFirstPage.classList.remove("open-menu");
// 	overlayFirstPage.classList.remove("open-overlay");
// 	// dataTable.style.display = "block";
//   }
  
//   openMenuFirstPageIcon.addEventListener("click", () => {
// 	alert("ok")
// 	openFirstPageNav();
//   });
  
//   closeMenuFirstPageIcon.addEventListener("click", () => {
// 	closeFirstPageNav();
//   });
  
