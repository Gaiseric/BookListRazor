// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var dataTableReading;
var dataTableReaded;
var dataTablePlanned;

$(document).ready(function () {
    loadDataTableReading();
    loadDataTableReaded();
    loadDataTablePlanned();
});

function loadDataTableReading() {
    dataTableReading = $('#DT_Reading').DataTable({
        "ajax": {
            "url": "/api/book?type=reading",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "name",
                "render": function (data) {
                    return `<big> ${data} </big>`;
                },
                "width": "40%"
            },
            { "data": "author", "width": "30%" },
            {
                "data": "startRead",
                "render": function (data) {
                    return `<small> ${data.substring(0, 10)} </small>`;
                },
                "width": "20%"
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

function loadDataTableReaded() {
    dataTableReaded = $('#DT_Readed').DataTable({
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

function loadDataTablePlanned() {
    dataTablePlanned = $('#DT_Planned').DataTable({
        "ajax": {
            "url": "/api/book?type=planned",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "name",
                "render": function (data) {
                    return `<big> ${data} </big>`;
                },
                "width": "50%"
            },
            { "data": "author", "width": "40%" },
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

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((wiilDelete) => {
        if (wiilDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                headers: {
                    'X-CSRF-TOKEN': antiForgeryToken()
                },
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTableReading.ajax.reload();
                        dataTableReaded.ajax.reload();
                        dataTablePlanned.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}
