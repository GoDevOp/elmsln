var H5PEditor = H5PEditor || {};
var ns = H5PEditor;
(function($) {
  ns.init = function () {
    var h5peditor;
    var $upload = $('.form-item-files-h5p');
    var $editor = $('.h5p-editor');
    var $create = $('#edit-h5p-editor').hide();
    var $type = $('input[name="h5p_type"]');
    var $params = $('input[name="h5p_params"]');
    var $library = $('input[name="h5p_library"]');
    var library = $library.val();

    ns.$ = H5P.jQuery;
    ns.basePath = Drupal.settings.basePath +  Drupal.settings.h5peditor.modulePath + '/h5peditor/';
    ns.contentId = Drupal.settings.h5peditor.nodeVersionId;
    ns.fileIcon = Drupal.settings.h5peditor.fileIcon;
    ns.ajaxPath = Drupal.settings.h5peditor.ajaxPath;
    
    // Semantics describing what copyright information can be stored for media.
    ns.copyrightSemantics = Drupal.settings.h5peditor.copyrightSemantics;

    $type.change(function () {
      if ($type.filter(':checked').val() === 'upload') {
        $create.hide();
        $upload.show();
      }
      else {
        $upload.hide();
        if (h5peditor === undefined) {
          h5peditor = new ns.Editor(library, JSON.parse($params.val()));
          h5peditor.replace($editor);
        }
        $create.show();
      }
    });

    if (library) {
      $type.filter('input[value="create"]').attr('checked', true).change();
    }

    $('#h5p-content-node-form').submit(function () {
      if (h5peditor !== undefined) {
        var params = h5peditor.getParams();

        if (params === false) {
          // return false;
          /*
           * TODO: Give good feedback when validation fails. Currently it seems save and delete buttons
           * aren't working, but the user doesn't get any indication of why they aren't working.
           */
        }

        if (params !== undefined) {
          $library.val(h5peditor.getLibrary());
          $params.val(JSON.stringify(params));
        }
      }
    });
  };

  $(document).ready(ns.init);
})(H5P.jQuery);
