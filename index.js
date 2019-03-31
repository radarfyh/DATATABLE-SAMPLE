// 设置默认值
$.extend( true, $.fn.dataTable.defaults, {
    "searching": false,
    "ordering": false
} );

$(document).ready(function() {
	var oTable = $("#stat_table");
	var oTbody = $("#stat_table tbody");
	var groupColumn = 3; //按“Office”来分组
	
	var oDatatable = oTable.DataTable({
		//定义DOM，各个组件放置位置
		// 		<div class="top">
		// 			{ info },
		// 		</div>
		// 		{ processing }
		// 		{ table },
		// 		<div class="bottom">
		// 			{ filter }
		// 			{ length }
		// 			{ pagination }
		// 		</div>
		// 		<div class="clear">
		// 		</div>
		//"dom": '<"top"i>rt<"bottom"flp><"clear">',
		"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',

		//状态自动保存
		stateSave: false,

		//滚动
		//scrollY: "70vh", //"500px",
		scrollX: true,
		scrollCollapse: true,

		//分页
		paging: true,
		pagingType: "first_last_numbers",
		"lengthMenu": [
			[5, 10, 25, 50, -1],
			[5, 10, 25, 50, "All"]
		],

		// 国际化
		"language": {
			"decimal": "-",
			"thousands": ".",
			"lengthMenu": "每页显示 _MENU_ 记录数",
			"zeroRecords": "对比起，什么都没有找到",
			"info": "正在显示第 _PAGE_ 页 总共 _PAGES_ 页",
			//"info":           "Showing _START_ to _END_ of _TOTAL_ entries",
			"infoEmpty": "没有记录获得",
			//"infoEmpty":      "Showing 0 to 0 of 0 entries",
			"infoFiltered": "(从总计 _MAX_ 条记录中过滤而得)",
			"emptyTable": "表中没有数据",
			"infoPostFix": "",
			"lengthMenu": "每页显示 _MENU_ 条",
			"loadingRecords": "加载中，请耐心等候...",
			"processing": "处理中，请耐心等候...",
			"search": "搜索:",
			"paginate": {
				"first": "第一页",
				"last": "最后一页",
				"next": "下一页",
				"previous": "上一页"
			},
			"aria": {
				"sortAscending": ": 升序排序中",
				"sortDescending": ": 降序排序中"
			},
			//"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
		},
		

		
		//定义列
		columnDefs: [
			{ //Complex headers with column visibility?
				//"visible": false,
				//"targets": -1
			},{
				// The `data` parameter refers to the data for the cell (defined by the
				// `data` option, which defaults to the column being worked with, in
				// this case `data: 0`.
				"render": function(data, type, row) {
					return data + ' (' + row["office"] + ')'; //第一列的值后面加括号和第三列值, 加了"data": "Office"后不能按序号获取数据
				},
				"targets": 0,
				"data":"First Name(Office)"
			}, {
				targets: [1], //第2列
				"data": "Last name"
			},{
				targets: [2], //第三列
				//orderData: [2, 1], //第三列升序
				visible: false, //可见
				searchable: false, //不可搜索
				"data": "Position"
			}, {
				targets: [3],
				orderData: [3, 0], //第四列降序
				"visible": false,
				"data": "Office"
			}, {
				targets: [4],
				visible: false,
				//orderData: [4, 0],
				"data": "Age"
			}, {
				targets: [5], //第6列
				"data": "Start date"
			},{
				targets: [6], //第7列
				"data": "Salary"
			},{
				targets: [7], //第8列
				"data": "Extn."
			},{
				targets: [8], //第9列
				"data": "E-mail"
			},
			
		],
// 		"columns": [  //列名，Json格式化
//             { "data": "first name" },
//             { "data": "last name" },
//             { "data": "position" },
//             { "data": "office" },
//             { "data": "age" },
//             { "data": "start_date" },
//             { "data": "salary" },
//             { "data": "extn." },
//             { "data": "e-mail" },
//		],
	    "createdRow": 
			function ( row, data, index ) { //创建行时的回调函数
				if ( data["Salary"].replace(/[\$,]/g, '') * 1 > 150000 ) {
					$('td', row).eq(6).addClass('highlight');
			}
		},
		
		// 行分组初始化
		//"displayLength": 25,
// 		"drawCallback": function ( settings ) {
// 		    var api = this.api();
// 		    var rows = api.rows( {page:'current'} ).nodes();
// 		    var last=null;
// 		 
// 		    api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
// 		        if ( last !== group ) {
// 		            $(rows).eq( i ).before(
// 		                '<tr class="group"><td colspan="9">'+group+'</td></tr>'
// 		            );
// 		 
// 		            last = group;
// 		        }
// 		    } );
// 		}
	});

	// DataTable事件
	var eventFired = function(type) {
		var n = $('#demo_info')[0];
		n.innerHTML += '<div>' + type + ' event - ' + new Date().getTime() + '</div>';
		n.scrollTop = n.scrollHeight;
	}

	oTable.on('order.dt', function() {
			eventFired('Order');
		})
		.on('search.dt', function() {
			eventFired('Search');
		})
		.on('page.dt', function() {
			eventFired('Page');
		});

	// jQuery事件：点击
	oTbody.on('click', 'tr', function() {
		var data = oDatatable.row(this).data();
		alert('You clicked on ' + data["first name"] + '\'s row');
// 		})
// 		.on( 'click', 'tr.group', function () {
// 			var currentOrder = oDatatable.order()[0];
// 			if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
// 				oDatatable.order( [ groupColumn, 'desc' ] ).draw();
// 			}
// 			else {
// 				oDatatable.order( [ groupColumn, 'asc' ] ).draw();
// 			}
		});
});
