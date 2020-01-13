// $(document).on('ready turbolinks:load', function() {
//   // reset count
//   M.Modal._count = 0;

//   $('.modal').modal();
  
//   console.log('modals initialized on ready and turbolinks:load');
// });

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.modal');

  const instances = M.Modal.init(elems);

  console.log('modals initialized on ready and turbolinks:load');
});