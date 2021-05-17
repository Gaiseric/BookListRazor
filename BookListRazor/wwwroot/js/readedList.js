var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book?type=readed",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "name",
                "render": function (data) {
                    return `<big> ${data} </big>`;
                },
                "width": "30%"
            },
            { "data": "author", "width": "20%" },
            {
                "data": "startRead",
                "render": function (data) {
                    return `<small> ${data.substring(0, 10)} </small>`;
                },
                "width": "20%"
            },
            {
                "data": "endRead",
                "render": function (data) {
                    return `<small> ${data.substring(0, 10)} </small>`;
                }, "width": "20%"
            },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a class="btn btn-outline-success text-center" href="/BookList/Upsert?id=${data}"><small> <i class="far fa-edit"></i> Edit</small></a>
                        <a class="btn btn-outline-danger text-center" href="#" onclick=Delete('/api/book?id='+${data})> <small> <i class="far fa-trash-alt"></i> Delete</small></a>
                        </div>`;
                }, "width": "10%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}