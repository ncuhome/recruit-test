var QuestionPage = function (element) {
  AnimatePage.apply(this, arguments);
};

Core.extend(QuestionPage, AnimatePage);

QuestionPage.prototype.init = function () {
  QuestionPage.super.init.call(this);

  var page = this.element;
  $(page)
    .find('input[type="radio"]')
    .on("change", function () {
      $(page).find(".next-btn").removeAttr("disabled");
    });
};

QuestionPage.prototype.enter = function () {
  $(this.element).find('input[type="radio"]').prop("checked", false);
  $(this.element).find(".next-btn").attr("disabled", true);

  QuestionPage.super.enter.call(this);
};

QuestionPage.prototype.result = function () {
  console.log($(this.element).find('input[type="radio"]:checked').val());
  return $(this.element).find('input[type="radio"]:checked').val();
};
