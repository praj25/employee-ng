for (i = new Date().getFullYear() ; i >= 1950; i--) {
$('.yearPicker').append($('<option />').val(i).html(i));
}
 