$(function() {
  // filter form
  $("#filter_form").submit(function() {
    var url = this.action;
    var query_string = $.param($.map($(this).serializeArray(), function(i) { return (i.value ? i : null)}));
    query_string = query_string ? "?" + query_string : '';
    document.location = url + query_string + document.location.hash;
    return false;
  });

  if ('date' != $("#f_created_at").val()) {
    $("#filter_apply").attr("disabled", true);
    $("#f_created_at_interval").hide();    
  }

  $("#f_created_at_interval .datepicker").datepicker();

  $("#f_created_at").change(function() {
    $this = $(this);
    if ('date' == $this.val()) {
      $("#f_created_at_interval").show();
      $("#filter_apply").attr("disabled", false);
    }
    else {
      $("#filter_apply").attr("disabled", true);
      $("#f_created_at_interval .datepicker").each(function() { $(this).val(''); });
      $("#f_created_at_interval").hide();
      $(this.form).submit();
    }
  });

  $("#f_type").change(function() { $(this.form).submit(); });

  // tablesorter
  var sort_by = {};
  var sortable_by = ['id', 'created_at', 'amount', 'comment', 'tags'];
  var sort_orders = ['desc', 'asc'];

  sort_by['column'] = sortable_by.indexOf(document.location.hash.replace(/^#/, '').split(/\s*,/)[0]);
  sort_by['order'] = sort_orders.indexOf(document.location.hash.split(/\s*,\s*/)[1]);

  // default sort: created_at,desc
  if (-1 == sort_by['column']) { sort_by['column'] = 1; }
  if (-1 == sort_by['order']) { sort_by['order'] = 1; }

  $("#entries").tablesorter({
    cssAsc: 'sort_asc',
    cssDesc: 'sort_desc',
    sortList: [[sort_by['column'], sort_by['order']]],
    widgets: ["zebra"],
  }).bind("sortEnd", function(e) {
    if (1 < this.config.sortList.length) { return; } // prevent hash change for multisort

    var l = $(this.config.headerList);
    l.each(function() {
      var m = this.className.match(/sort_(asc|desc)/);
      if (m) { document.location.hash = sortable_by[l.index(this)] + "," + m[1]; }
    });
  });
});