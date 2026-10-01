/**
 * Avdhoot Dental Clinic & Implant Centre
 * Main Interactive Scripts
 */

// 1. SOP Scroll Normalization
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initCounters();
});

// Clinic WhatsApp Number
const CLINIC_PHONE = "919975256390";
const CLINIC_PHONE_DISPLAY = "+91 99752 56390";

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMobileMenu(show) {
  if (show) {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
}
if (closeMobileMenuBtn) {
  closeMobileMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
}
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => toggleMobileMenu(false));
});

// 3. Sticky Navbar Shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('shadow-md', 'bg-white/95');
    navbar.classList.remove('bg-white/90');
  } else {
    navbar.classList.remove('shadow-md');
    navbar.classList.add('bg-white/90');
  }
});

// 4. Marathi Language Toggle
let currentLang = 'en';
const langToggleBtn = document.getElementById('langToggleBtn');
const langToggleText = document.getElementById('langToggleText');

const translations = {
  en: {
    heroTag: "Painless, Precision Dental Care & Advanced Implant Solutions.",
    heroSub: "Specialized Gum Treatments & Permanent Dental Implants in Ravet, Pimpri-Chinchwad. Experience gentle, sterile, 5-star dental care led by Dr. Nikita Palkar - Sankpal (M.D.S. Periodontist & Implantologist).",
    btnLang: "मराठी"
  },
  mr: {
    heroTag: "वेदनामुक्त उपचार, अचूक दंत शल्यचिकित्सा आणि आधुनिक डेंटल इम्प्लांट्स.",
    heroSub: "रावेत, पिंपरी-चिंचवड मधील हिरड्यांचे विकार व डेंटल इम्प्लांट्स तज्ज्ञ. डॉ. निकिता पालकर - सांकपाळ (M.D.S. पेरिओडॉन्टिस्ट व इम्प्लांटोलॉजिस्ट) यांच्याकडून अत्यंत सुरक्षित व वेदनामुक्त उपचार.",
    btnLang: "English"
  }
};

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'mr' : 'en';
    const heroTagEl = document.getElementById('heroTagline');
    const heroSubEl = document.getElementById('heroSubheading');

    if (heroTagEl && translations[currentLang]) {
      heroTagEl.textContent = translations[currentLang].heroTag;
    }
    if (heroSubEl && translations[currentLang]) {
      heroSubEl.textContent = translations[currentLang].heroSub;
    }
    if (langToggleText) {
      langToggleText.textContent = translations[currentLang].btnLang;
    }
  });
}

// 5. Booking Modal Controls
const bookingModal = document.getElementById('bookingModal');
const openBookingBtns = document.querySelectorAll('.open-booking-modal');
const closeBookingModalBtn = document.getElementById('closeBookingModalBtn');
const modalServiceSelect = document.getElementById('modalService');

function openBookingModal(preselectedService = '') {
  if (bookingModal) {
    bookingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (preselectedService && modalServiceSelect) {
      modalServiceSelect.value = preselectedService;
    }
  }
}

function closeBookingModal() {
  if (bookingModal) {
    bookingModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

openBookingBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const service = btn.getAttribute('data-service') || '';
    openBookingModal(service);
  });
});

if (closeBookingModalBtn) {
  closeBookingModalBtn.addEventListener('click', closeBookingModal);
}
if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });
}

// 6. WhatsApp Dispatch Form Handlers
function generateWhatsAppMessage({ name, phone, service, date, time, emergency, notes }) {
  const isEmergency = emergency ? "🚨 YES (URGENT PAIN / SWELLING)" : "No (Routine Checkup / Consultation)";
  
  return encodeURIComponent(
`Namaste Dr. Nikita! 👋
I would like to schedule a consultation at *Avdhoot Dental Clinic & Implant Centre*:

👤 *Patient Name:* ${name}
📱 *Phone Number:* ${phone}
🦷 *Service Needed:* ${service}
📅 *Preferred Date:* ${date || 'Earliest available'}
⏰ *Preferred Time:* ${time || 'Flexible'}
${notes ? `📝 *Notes/Symptoms:* ${notes}\n` : ''}🚨 *Immediate Emergency:* ${isEmergency}

📍 *Clinic:* Celestial City Rd, Ravet, Pimpri-Chinchwad
Please confirm the available appointment slot. Thank you!`
  );
}

// Handle Modal Booking Form
const modalBookingForm = document.getElementById('modalBookingForm');
if (modalBookingForm) {
  modalBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modalName').value.trim();
    const phone = document.getElementById('modalPhone').value.trim();
    const service = document.getElementById('modalService').value;
    const date = document.getElementById('modalDate').value;
    const time = document.getElementById('modalTime').value;
    const emergency = document.getElementById('modalEmergency').checked;

    if (!name || !phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    const waMsg = generateWhatsAppMessage({ name, phone, service, date, time, emergency });
    closeBookingModal();
    window.open(`https://wa.me/${CLINIC_PHONE}?text=${waMsg}`, '_blank');
  });
}

// Handle Main Page Inline Booking Form
const inlineBookingForm = document.getElementById('inlineBookingForm');
if (inlineBookingForm) {
  inlineBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('inlineName').value.trim();
    const phone = document.getElementById('inlinePhone').value.trim();
    const service = document.getElementById('inlineService').value;
    const date = document.getElementById('inlineDate').value;
    const time = document.getElementById('inlineTime').value;
    const emergency = document.getElementById('inlineEmergency').checked;
    const notes = document.getElementById('inlineNotes') ? document.getElementById('inlineNotes').value.trim() : '';

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const waMsg = generateWhatsAppMessage({ name, phone, service, date, time, emergency, notes });
    window.open(`https://wa.me/${CLINIC_PHONE}?text=${waMsg}`, '_blank');
  });
}

// 7. Service Detail Modal
const serviceData = {
  implants: {
    title: "Dental Implants & Full Mouth Rehabilitation",
    subtitle: "Permanent, Natural-Feeling Teeth Replacement by Certified Implantologist",
    icon: "implant",
    overview: "Dental implants are titanium screws surgically anchored into the jawbone to replace missing tooth roots. As a qualified Periodontist & Implantologist, Dr. Nikita ensures high-precision placement with minimal bone loss and maximum longevity.",
    highlights: [
      "Single tooth & multi-teeth permanent replacement",
      "All-on-4 and All-on-6 full arch restoration",
      "Sinus lift and advanced bone augmentation",
      "Immediate loading implants for eligible patients",
      "Lifetime durability with natural bite force"
    ],
    duration: "2–3 visits depending on bone healing",
    recovery: "Virtually painless with modern surgical guides; normal eating within 48 hours"
  },
  periodontics: {
    title: "Gum Specialist Care (Periodontics) & Laser Therapy",
    subtitle: "Stop Bleeding Gums, Reverse Loosening, and Restore Gum Health",
    icon: "gum",
    overview: "Healthy gums are the foundation of healthy teeth. Our specialized periodontal therapy treats gingivitis, periodontitis, bad breath, and receding gums using advanced ultrasonic scaling and minimally invasive laser techniques.",
    highlights: [
      "Deep subgingival scaling and root planing",
      "Flap surgery with bone grafts for mobile teeth",
      "Cosmetic gum contouring & gummy smile correction",
      "Laser-assisted bacterial reduction",
      "Treatment for bleeding, swollen, and sensitive gums"
    ],
    duration: "Single sitting for deep cleaning; 2 sessions for advanced flap procedures",
    recovery: "Instant relief from bleeding; gums tighten within 7–10 days"
  },
  rct: {
    title: "Painless Root Canal Treatment (RCT)",
    subtitle: "Single-Sitting Rotary RCT to Save Your Natural Tooth",
    icon: "rct",
    overview: "Save infected or deeply decayed teeth without pain. We utilize digital apex locators, rotary endodontics, and sterile rubber dam isolation to clear infected pulp, disinfect canals, and hermetically seal the tooth in one seamless sitting.",
    highlights: [
      "Computer-assisted rotary files for ultra-fast treatment",
      "Digital RVG X-ray monitoring with minimal radiation",
      "100% sterile rubber dam isolation prevents reinfection",
      "Post & core buildup with high-strength Zirconia crown",
      "Zero discomfort during and after the procedure"
    ],
    duration: "45–60 minutes (Single sitting in most uncomplicated cases)",
    recovery: "Immediate toothache relief; normal chewing resumes with crown placement"
  },
  cosmetic: {
    title: "Cosmetic Dentistry & Smile Makeovers",
    subtitle: "Transforming Smiles with Aesthetic Precision & Natural Harmony",
    icon: "cosmetic",
    overview: "Achieve the radiant, balanced smile you have always desired. From professional in-clinic laser teeth whitening to bespoke porcelain veneers and clear aligners, every smile design is custom crafted to your facial proportions.",
    highlights: [
      "Custom porcelain veneers and ultra-thin laminates",
      "In-office teeth whitening (up to 4–6 shades brighter)",
      "Composite aesthetic edge bonding for chipped teeth",
      "Clear aligners for teeth straightening without metal braces",
      "Diastema closure (closing front tooth gaps)"
    ],
    duration: "1–2 visits depending on the treatment",
    recovery: "Zero downtime; walk out with a refreshed smile immediately"
  },
  pediatric: {
    title: "Preventive & Pediatric Gentle Dentistry",
    subtitle: "Compassionate, Fear-Free Dental Care for Kids & Whole Family",
    icon: "pediatric",
    overview: "We pride ourselves on our gentle, friendly approach that turns dental anxiety into smiling visits. Our women-led team is exceptionally patient with children, ensuring early cavity prevention and pleasant dental experiences.",
    highlights: [
      "Fluoride varnish and pit-and-fissure sealants",
      "Painless milk tooth fillings and gentle extractions",
      "Habit breaking appliances (thumb-sucking, tongue thrusting)",
      "Early orthodontic screening and jaw guidance",
      "Nightguards for adult teeth grinding (bruxism)"
    ],
    duration: "30 minutes per appointment",
    recovery: "Zero discomfort; kids leave with balloons, stickers & bright smiles"
  },
  surgery: {
    title: "Oral Surgery & Wisdom Tooth Impaction",
    subtitle: "Minimally Invasive Extractions with Quick, Comfortable Healing",
    icon: "surgery",
    overview: "Painful or impacted wisdom teeth can cause severe jaw aches and crowding. Dr. Nikita executes surgical extractions with extreme gentleness, minimal tissue disturbance, and advanced healing protocols.",
    highlights: [
      "Painless removal of horizontal and angular impacted teeth",
      "Preservation of surrounding jawbone and nerve canals",
      "Suture-free and absorbable suture options",
      "Clear post-operative medicine kit and diet guidelines",
      "Rapid swelling control and quick recovery"
    ],
    duration: "30–45 minutes with localized anesthesia",
    recovery: "Normal routine resumed within 24–48 hours"
  }
};

const serviceModal = document.getElementById('serviceModal');
const closeServiceModalBtn = document.getElementById('closeServiceModalBtn');
const openServiceBtns = document.querySelectorAll('.open-service-detail');

function openServiceModal(serviceKey) {
  const s = serviceData[serviceKey];
  if (!s || !serviceModal) return;

  document.getElementById('serviceModalTitle').textContent = s.title;
  document.getElementById('serviceModalSubtitle').textContent = s.subtitle;
  document.getElementById('serviceModalOverview').textContent = s.overview;
  document.getElementById('serviceModalDuration').textContent = s.duration;
  document.getElementById('serviceModalRecovery').textContent = s.recovery;

  const highlightsList = document.getElementById('serviceModalHighlights');
  highlightsList.innerHTML = s.highlights.map(h => 
    `<li class="flex items-start gap-2 text-slate-700 text-sm">
      <span class="text-teal-700 font-bold">✓</span>
      <span>${h}</span>
    </li>`
  ).join('');

  const modalActionBtn = document.getElementById('serviceModalBookBtn');
  if (modalActionBtn) {
    modalActionBtn.onclick = () => {
      closeServiceModal();
      openBookingModal(s.title);
    };
  }

  serviceModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  if (serviceModal) {
    serviceModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

openServiceBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const key = btn.getAttribute('data-service-key');
    openServiceModal(key);
  });
});

if (closeServiceModalBtn) {
  closeServiceModalBtn.addEventListener('click', closeServiceModal);
}
if (serviceModal) {
  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeServiceModal();
    }
  });
}

// 8. Photo Gallery Filtering & Lightbox
const galleryTabs = document.querySelectorAll('.gallery-tab-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');

galleryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category');
    
    // Update active tab styles
    galleryTabs.forEach(t => {
      t.classList.remove('bg-[#0F4C5C]', 'text-white');
      t.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
    });
    tab.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
    tab.classList.add('bg-[#0F4C5C]', 'text-white');

    // Filter items
    galleryItems.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      if (category === 'all' || itemCat === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || img.alt;
    if (img && lightboxModal && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeLightbox() {
  if (lightboxModal) {
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

if (closeLightboxBtn) {
  closeLightboxBtn.addEventListener('click', closeLightbox);
}
if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });
}

// 9. FAQ Accordions
const faqButtons = document.querySelectorAll('.faq-toggle');
faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !content.classList.contains('hidden');

    // Close all other FAQs
    document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

    if (!isOpen) {
      content.classList.remove('hidden');
      if (icon) icon.style.transform = 'rotate(180deg)';
    }
  });
});

// 10. Animated Counter Numbers
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const step = target / 40;

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            entry.target.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
            clearInterval(timer);
          } else {
            entry.target.textContent = (isDecimal ? count.toFixed(1) : Math.round(count)) + suffix;
          }
        }, 30);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}
