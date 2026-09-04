// This is the only JavaScript file on the site.
// It does four jobs: put the year in the footer, open/close the Menu,
// filter park cards with a loop, and check the contact form.
// Every line is commented so you can follow what it does.
//
// Words you will see a lot:
//   function  = a named set of steps you can run later
//   return    = the value a function hands back when it is done
//   loop      = repeat the same steps for every item in a list

// -----------------------------
// Footer year
// -----------------------------

// Put the current year in the footer so the copyright stays up to date.
// Returns nothing (undefined). A function with no return statement gives back undefined.
function setFooterYear() {
  // Look for the element with id="year". Other pages still call this; it is fine if it is missing.
  var yearEl = document.getElementById("year");
  // Only change the text if that element is on this page.
  if (yearEl) {
    // new Date() is "right now". getFullYear() pulls the year number, like 2026.
    yearEl.textContent = new Date().getFullYear();
  }
}

// -----------------------------
// Mobile menu
// -----------------------------

// Find the Menu button. On wide screens CSS hides it, but it is still in the HTML.
var menuButton = document.querySelector(".menu-button");

// Find the nav list we show and hide on small screens.
var navLinks = document.querySelector(".site-nav");

// Tell us whether the mobile menu is open right now.
// Returns true if the nav has the is-open class, otherwise false.
function isNavOpen() {
  // If the nav is not on the page, treat it as closed.
  if (!navLinks) {
    // Hand false back to whoever called this function.
    return false;
  }
  // classList.contains returns true or false. We pass that value straight back.
  return navLinks.classList.contains("is-open");
}

// Close the mobile menu and tell screen readers it is closed.
// Returns nothing.
function closeNav() {
  // If the nav is on the page, hide it by removing the open class.
  if (navLinks) {
    // CSS only shows the menu when .is-open is present on small screens.
    navLinks.classList.remove("is-open");
  }
  // If the button is on the page, mark it as not expanded.
  if (menuButton) {
    // aria-expanded is how screen readers know the menu state.
    menuButton.setAttribute("aria-expanded", "false");
  }
}

// Open the menu if it is closed, or close it if it is open.
// Returns nothing.
function toggleNav() {
  // Ask isNavOpen. That function returns true or false.
  var open = isNavOpen();
  // If it is already open, close it and stop here.
  if (open) {
    // Reuse closeNav so we do not copy the same steps twice.
    closeNav();
    // return with no value just exits the function early.
    return;
  }
  // If we got this far, the menu is closed, so open it.
  if (navLinks) {
    // Adding is-open makes the CSS display the list.
    navLinks.classList.add("is-open");
  }
  if (menuButton) {
    // Tell screen readers the menu is now open.
    menuButton.setAttribute("aria-expanded", "true");
  }
}

// -----------------------------
// Parks filter (this is the loop to practice)
// -----------------------------

// Collect every checked filter box.
// Returns an array of strings, like ["playground", "trail"].
// If nothing is checked, it returns an empty array: []
function getSelectedTags() {
  // Find all checkbox inputs inside the filter list.
  var boxes = document.querySelectorAll(".filter-options input[type='checkbox']");
  // Start with an empty list. We will push tag names into it.
  var selected = [];
  // LOOP: walk through each checkbox one by one.
  // i starts at 0 (the first box).
  // The loop keeps going while i is less than the number of boxes.
  // After each pass, i = i + 1 moves to the next box.
  for (var i = 0; i < boxes.length; i++) {
    // boxes[i] is the checkbox at position i.
    var box = boxes[i];
    // checked is true when the user has ticked this box.
    if (box.checked) {
      // value is the tag name written on the input, like "playground".
      selected.push(box.value);
    }
  }
  // Hand the finished list back to whoever called this function.
  return selected;
}

// Check whether one park card includes a given tag.
// card is a DOM element. tag is a string like "trail".
// Returns true if the card's data-tags contains that tag, otherwise false.
function cardHasTag(card, tag) {
  // data-tags is a space-separated list, for example "playground trail".
  var tags = card.getAttribute("data-tags");
  // If the card has no data-tags attribute, it matches nothing.
  if (!tags) {
    // Hand false back.
    return false;
  }
  // Split the string into an array on spaces: "a b" becomes ["a", "b"].
  var parts = tags.split(" ");
  // LOOP: look at each tag on this card.
  for (var i = 0; i < parts.length; i++) {
    // If this part is the tag we were asked about, we have a match.
    if (parts[i] === tag) {
      // Hand true back right away. No need to keep looping.
      return true;
    }
  }
  // We checked every tag on the card and none of them matched.
  return false;
}

// Decide if a park card should stay visible for the current filters.
// Returns true to show the card, or false to hide it.
function cardMatchesFilters(card, selectedTags) {
  // If the list of selected tags is empty, there is no filter, so show every card.
  if (selectedTags.length === 0) {
    // true means "yes, show this card".
    return true;
  }
  // LOOP: if ANY selected tag is on this card, show it (OR logic).
  for (var i = 0; i < selectedTags.length; i++) {
    // selectedTags[i] is one checked tag, like "boat-ramp".
    var tag = selectedTags[i];
    // cardHasTag returns true or false. If true, this card is a match.
    if (cardHasTag(card, tag)) {
      // Hand true back. One matching tag is enough.
      return true;
    }
  }
  // None of the selected tags were on this card, so hide it.
  return false;
}

// Update the "Showing X of Y parks" line.
// visibleCount and totalCount are numbers.
// Returns nothing.
function updateParksStatus(visibleCount, totalCount) {
  // Find the status paragraph.
  var statusEl = document.getElementById("parks-status");
  // If this page has no status line, stop.
  if (!statusEl) {
    return;
  }
  // Write a plain English sentence using the two numbers.
  statusEl.textContent = "Showing " + visibleCount + " of " + totalCount + " parks.";
}

// Show or hide each park card by looping over them.
// This is the main loop to practice.
// Returns the number of cards that are still visible.
function filterParks() {
  // getSelectedTags returns an array. Store it in a variable so we can reuse it.
  var selectedTags = getSelectedTags();
  // Find every park card. querySelectorAll gives us a list we can loop over.
  var cards = document.querySelectorAll(".park-card");
  // Start a counter at 0. Add 1 each time we keep a card visible.
  var visibleCount = 0;

  // --- PRACTICE LOOP ---
  // i is the index (position) of the card we are looking at.
  // i = 0 is the first card.
  // The loop repeats while i is less than cards.length (how many cards there are).
  // i = i + 1 moves to the next card after each pass.
  for (var i = 0; i < cards.length; i++) {
    // Pull the card at position i out of the list.
    var card = cards[i];
    // Ask cardMatchesFilters. It returns true (show) or false (hide).
    var shouldShow = cardMatchesFilters(card, selectedTags);
    // If the card should be shown...
    if (shouldShow) {
      // hidden = false means the browser displays the card.
      card.hidden = false;
      // Add 1 to the counter because this card is visible.
      visibleCount = visibleCount + 1;
    } else {
      // hidden = true means the browser does not display the card.
      card.hidden = true;
    }
  }

  // Find the empty-state message that we show only when nothing matches.
  var emptyEl = document.getElementById("parks-empty");
  // If that message exists, hide it when we have results, show it when we do not.
  if (emptyEl) {
    // visibleCount === 0 is true when no cards are showing.
    emptyEl.hidden = visibleCount !== 0;
  }

  // Update the status line with the count we just tallied.
  updateParksStatus(visibleCount, cards.length);

  // Hand the visible count back. Other functions can use it, or ignore it.
  return visibleCount;
}

// Uncheck every filter box, then show all parks again.
// Returns nothing.
function clearParkFilters() {
  // Find all the filter checkboxes.
  var boxes = document.querySelectorAll(".filter-options input[type='checkbox']");
  // LOOP: turn each box off.
  for (var i = 0; i < boxes.length; i++) {
    // checked = false unticks the box.
    boxes[i].checked = false;
  }
  // Run the filter again. With nothing checked, it will show every card.
  filterParks();
}

// Wire the checkboxes and the "Show all" button to the filter function.
// Returns nothing.
function setupParkFilters() {
  // Find the filter form. Pages without it skip this whole function.
  var filterForm = document.getElementById("park-filters");
  // If there is no filter form on this page, stop.
  if (!filterForm) {
    return;
  }
  // Find all checkboxes so we can listen for changes.
  var boxes = document.querySelectorAll(".filter-options input[type='checkbox']");
  // LOOP: when any box is ticked or unticked, run filterParks.
  for (var i = 0; i < boxes.length; i++) {
    // "change" fires when the user checks or unchecks the box.
    boxes[i].addEventListener("change", function () {
      // Call filterParks. We do not need the number it returns here.
      filterParks();
    });
  }
  // Find the Show all button.
  var clearButton = document.getElementById("clear-filters");
  // If the button is on the page, listen for clicks.
  if (clearButton) {
    // When the button is clicked, run clearParkFilters.
    clearButton.addEventListener("click", function () {
      // That function unchecks boxes and shows every card.
      clearParkFilters();
    });
  }
  // Run once on page load so the status line is correct even before anyone clicks.
  filterParks();
}

// -----------------------------
// Contact form
// -----------------------------

// Check whether a string looks like an email address.
// Returns true if it has an @ and a dot after the @, otherwise false.
function isValidEmail(value) {
  // indexOf("@") returns the position of @, or -1 if it is not there.
  var atIndex = value.indexOf("@");
  // If there is no @, this is not an email.
  if (atIndex === -1) {
    return false;
  }
  // lastIndexOf(".") finds the last dot. Emails need a dot in the domain, like .example
  var dotIndex = value.lastIndexOf(".");
  // The dot must come after the @, and not be the last character.
  if (dotIndex <= atIndex + 1) {
    return false;
  }
  // The string should have at least one character after the last dot.
  if (dotIndex === value.length - 1) {
    return false;
  }
  // If we got this far, it is good enough for this practice form.
  return true;
}

// Check the name and email fields.
// Returns an error string if something is wrong, or "" (empty string) if the form is OK.
function getContactError() {
  // Find the name input by its id.
  var nameField = document.getElementById("name");
  // Find the email input by its id.
  var emailField = document.getElementById("email");
  // If the fields are not on this page, there is nothing to check.
  if (!nameField || !emailField) {
    // Empty string means "no error".
    return "";
  }
  // trim() drops extra spaces on the ends so "  " does not count as a name.
  var nameValue = nameField.value.trim();
  // Do the same for email.
  var emailValue = emailField.value.trim();
  // If both are empty, say so in one sentence.
  if (nameValue === "" && emailValue === "") {
    return "Please enter your name and email.";
  }
  // If only the name is missing, ask for it.
  if (nameValue === "") {
    return "Please enter your name.";
  }
  // If only the email is missing, ask for it.
  if (emailValue === "") {
    return "Please enter your email.";
  }
  // isValidEmail returns false when the email does not look valid.
  if (!isValidEmail(emailValue)) {
    return "Please enter a valid email address.";
  }
  // Empty string means we found no problems.
  return "";
}

// Run when the user tries to send the contact form.
// event is the submit event from the browser.
// Returns nothing.
function handleContactSubmit(event) {
  // Stop the browser from trying to send the form to a server. This is a static site.
  event.preventDefault();
  // Ask getContactError. It returns a message or an empty string.
  var errorText = getContactError();
  // Find the error box.
  var errorBox = document.getElementById("form-error");
  // Find the form itself.
  var contactForm = document.getElementById("contact-form");
  // Find the thank-you message.
  var thanksBox = document.getElementById("form-thanks");
  // If there is an error, show it and stop. Do not hide the form.
  if (errorText !== "") {
    // If the error box exists, put the message in it and unhide it.
    if (errorBox) {
      errorBox.textContent = errorText;
      errorBox.hidden = false;
    }
    // Leave the function now so we never reach the success steps.
    return;
  }
  // Hide the error box in case it was showing from an earlier try.
  if (errorBox) {
    errorBox.hidden = true;
  }
  // Hide the form so the user does not send it twice.
  if (contactForm) {
    contactForm.hidden = true;
  }
  // Show the thank-you message instead of the form.
  if (thanksBox) {
    thanksBox.hidden = false;
  }
}

// Attach the submit handler if this page has the contact form.
// Returns nothing.
function setupContactForm() {
  // Find the form. Other pages do not have it, and that is fine.
  var contactForm = document.getElementById("contact-form");
  // If there is no form, stop.
  if (!contactForm) {
    return;
  }
  // When the user clicks Send, run handleContactSubmit.
  contactForm.addEventListener("submit", handleContactSubmit);
}

// -----------------------------
// Start everything
// -----------------------------

// Run the setups that this page needs.
// Returns nothing.
function init() {
  // Always try to fill the year. Harmless if the span is missing.
  setFooterYear();
  // Only bind the menu button if both the button and the nav exist.
  if (menuButton && navLinks) {
    // When the Menu button is clicked, open or close the nav.
    menuButton.addEventListener("click", function () {
      toggleNav();
    });
  }
  // Find every link inside the navigation list.
  var navLinkItems = document.querySelectorAll(".site-nav a");
  // LOOP: when a nav link is clicked, close the mobile menu.
  for (var i = 0; i < navLinkItems.length; i++) {
    navLinkItems[i].addEventListener("click", function () {
      closeNav();
    });
  }
  // Set up park filters if this is the parks page.
  setupParkFilters();
  // Set up the contact form if this is the contact page.
  setupContactForm();
}

// When the HTML is finished loading, run init.
document.addEventListener("DOMContentLoaded", init);
