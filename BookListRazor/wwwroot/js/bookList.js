var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
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
                        <a class="btn btn-outline-success text-center" href="/BookList/Upsert?id=${data}"> <i class="far fa-edit"></i> <small>Edit</small></a>
                        <a class="btn btn-outline-danger text-center" href="#" onclick=Delete('/api/book?id='+${data})> <i class="far fa-trash-alt"></i> <small>Delete</small></a>
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
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}