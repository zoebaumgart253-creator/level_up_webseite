"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Mobiles Navigationsmenü
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#hauptnavigation");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  // Countdown bis zur Ausstellungseröffnung
  const targetDate = new Date("2027-05-15T18:00:00+02:00").getTime();
  const fields = {
    days: document.querySelector("#days"),
    hours: document.querySelector("#hours"),
    minutes: document.querySelector("#minutes"),
    seconds: document.querySelector("#seconds")
  };
  const status = document.querySelector("#countdown-status");
  if (fields.days && fields.hours && fields.minutes && fields.seconds) {
    const updateCountdown = () => {
      const distance = targetDate - Date.now();
      if (distance <= 0) {
        Object.values(fields).forEach((field) => { field.textContent = "00"; });
        if (status) status.textContent = "Die Ausstellungseröffnung hat begonnen oder liegt bereits zurück.";
        return;
      }
      fields.days.textContent = String(Math.floor(distance / 86400000));
      fields.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
      fields.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
      fields.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
    };
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  // Ticketformular: Demo ohne Server und ohne echte Bestellung
  const form = document.querySelector("#ticket-form");
  const message = document.querySelector("#form-message");
  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      message.hidden = false;
      message.focus?.();
    });
  }
});
