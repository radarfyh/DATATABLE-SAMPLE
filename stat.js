$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": 'stat.json',
		columns: [
            { title: "Name1" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    } );
} );