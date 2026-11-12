document.addEventListener("DOMContentLoaded", function() {
  
  var stepCheckboxes = document.querySelectorAll(".step-checkbox");
  var chapterCheckboxes = document.querySelectorAll(".chapter-checkbox");
  var chapters = document.querySelectorAll(".chapter");
  
  var stepsCounterText = document.getElementById("steps-counter");
  var chaptersCounterText = document.getElementById("chapters-counter");

  var hasCheered = false;

  function updateTutorial() {
    var totalSteps = stepCheckboxes.length;
    var stepsDone = 0;
    var chaptersDone = 0;

    for (var i = 0; i < stepCheckboxes.length; i++) {
      var box = stepCheckboxes[i];
      var stepRow = box.closest(".step");
      
      if (box.checked) {
        stepsDone++;
        stepRow.classList.add("done");
      } else {
        stepRow.classList.remove("done");
      }
    }

    for (var j = 0; j < chapters.length; j++) {
      var chap = chapters[j];
      var chapBoxes = chap.querySelectorAll(".step-checkbox");
      var chapMainBox = chap.querySelector(".chapter-checkbox");
      var statusSpan = chap.querySelector(".status-text");

      var allChecked = true;
      for (var k = 0; k < chapBoxes.length; k++) {
        if (!chapBoxes[k].checked) {
          allChecked = false;
        }
      }

      if (allChecked) {
        chapMainBox.checked = true;
        statusSpan.innerText = "Complete";
        chaptersDone++;
      } else {
        chapMainBox.checked = false;
        statusSpan.innerText = "Incomplete";
      }
    }

    stepsCounterText.innerText = stepsDone + "/" + totalSteps;
    chaptersCounterText.innerText = chaptersDone + "/" + chapters.length;

    if (stepsDone === totalSteps && !hasCheered) {
      var cheer = new Audio("Asset Images/Double Exposure/tutorial_complete.mp3");
      cheer.play();
      hasCheered = true;
    }

    if (stepsDone < totalSteps) {
      hasCheered = false;
    }
  }

  for (var i = 0; i < stepCheckboxes.length; i++) {
    stepCheckboxes[i].addEventListener("change", updateTutorial);
  }

  for (var j = 0; j < chapters.length; j++) {
    (function(chapterElement) {
      var mainBox = chapterElement.querySelector(".chapter-checkbox");
      var smallBoxes = chapterElement.querySelectorAll(".step-checkbox");

      mainBox.addEventListener("change", function() {
        for (var x = 0; x < smallBoxes.length; x++) {
          smallBoxes[x].checked = mainBox.checked;
        }
        updateTutorial();
      });
    })(chapters[j]);
  }

  for (var c = 0; c < chapters.length; c++) {
    var collapseBtn = chapters[c].querySelector(".collapse-btn");
    collapseBtn.addEventListener("click", function() {
      var parentChap = this.closest(".chapter");
      parentChap.classList.toggle("collapsed");
    });
  }

  var modal = document.getElementById("my-modal");
  var modalImg = document.getElementById("modal-img");
  var closeModal = document.getElementById("close-modal");
  var images = document.querySelectorAll(".images-row img");

  for (var m = 0; m < images.length; m++) {
    images[m].addEventListener("click", function() {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  }

  closeModal.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});