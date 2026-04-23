const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const detailsEls = document.querySelectorAll(".faq-list details");
detailsEls.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    detailsEls.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const guideTags = document.querySelectorAll(".hero-guide-tags [data-guide-view]");
const guideList = document.querySelector(".hero-guide-card ol");
const guideMainBtn = document.querySelector(".guide-main-btn");
const guideSubBtn = document.querySelector(".guide-sub-btn");

const guideContentByView = {
  beginner: {
    items: [
      '<strong>จักรราศี:</strong> ทำความเข้าใจ “ราศี/ลัคนา/ธาตุ”',
      "<strong>ดาวพระเคราะห์:</strong> ความหมายและบทบาทของดาว",
      "<strong>เรือนภพ & ทักษา:</strong> เครื่องมือหลักในการอ่าน",
    ],
    mainBtnText: "ไปที่เส้นทางเริ่มเรียน",
    mainBtnHref: "#path",
    subBtnText: "เปิดช่อง YouTube",
    subBtnHref: "https://www.youtube.com/@horapatana/videos",
  },
  review: {
    items: [
      "<strong>สรุปจักรราศี:</strong> จุดที่มักสับสน (ภาค/เพศ/ธาตุ)",
      "<strong>ดาวมาตรฐาน:</strong> เกษตร/อุจจ์/นิจจ์ และการให้น้ำหนัก",
      "<strong>องค์เกณฑ์:</strong> ปรับวิธีมองดวงให้เป็นระบบมากขึ้น",
    ],
    mainBtnText: "ดูหมวดบทเรียน",
    mainBtnHref: "#topics",
    subBtnText: "เปิดเว็บรวมบทเรียน",
    subBtnHref: "coming-soon.html",
  },
  advanced: {
    items: [
      "<strong>เรือนภพ:</strong> ความสัมพันธ์ของภพกับเรื่องราวชีวิต",
      "<strong>ทักษา:</strong> ใช้เป็นเครื่องมือพยากรณ์ประกอบ",
      '<strong>เกณฑ์ต่างๆ:</strong> ชั่งน้ำหนัก “ดี-เสีย” ให้แม่นยำขึ้น',
    ],
    mainBtnText: "ดูวิดีโอแนะนำ",
    mainBtnHref: "#videos",
    subBtnText: "อ่านคำถามที่พบบ่อย",
    subBtnHref: "#faq",
  },
};

if (guideTags.length && guideList && guideMainBtn && guideSubBtn) {
  const renderGuideContent = (viewKey) => {
    const content = guideContentByView[viewKey] ?? guideContentByView.beginner;
    guideList.innerHTML = content.items.map((item) => `<li>${item}</li>`).join("");
    guideMainBtn.textContent = content.mainBtnText;
    guideMainBtn.setAttribute("href", content.mainBtnHref);
    guideSubBtn.textContent = content.subBtnText;
    guideSubBtn.setAttribute("href", content.subBtnHref);

    const isExternalMain = content.mainBtnHref.startsWith("http");
    const isExternalSub = content.subBtnHref.startsWith("http");
    guideMainBtn.setAttribute("target", isExternalMain ? "_blank" : "_self");
    guideMainBtn.setAttribute("rel", isExternalMain ? "noreferrer" : "");
    guideSubBtn.setAttribute("target", isExternalSub ? "_blank" : "_self");
    guideSubBtn.setAttribute("rel", isExternalSub ? "noreferrer" : "");
  };

  const activateTag = (activeTag) => {
    const viewKey = activeTag.dataset.guideView || "beginner";
    guideTags.forEach((tag) => {
      tag.classList.toggle("active", tag === activeTag);
    });
    renderGuideContent(viewKey);
  };

  guideTags.forEach((tag) => {
    tag.addEventListener("click", () => activateTag(tag));
    tag.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateTag(tag);
      }
    });
  });

  const activeTag = document.querySelector(".hero-guide-tags [data-guide-view].active");
  renderGuideContent(activeTag?.dataset.guideView || "beginner");
}

const videoCards = document.querySelectorAll("#videos .video-row .video-card");
if (videoCards.length > 0) {
  let activeVideoIndex = 0;

  const setActiveVideo = (index) => {
    videoCards.forEach((card, cardIndex) => {
      const isActive = cardIndex === index;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-hidden", isActive ? "false" : "true");
      card.tabIndex = isActive ? 0 : -1;
    });
  };

  setActiveVideo(activeVideoIndex);

  window.setInterval(() => {
    activeVideoIndex = (activeVideoIndex + 1) % videoCards.length;
    setActiveVideo(activeVideoIndex);
  }, 3000);
}

const zodiacSpans = document.querySelectorAll("#zodiac-wheel .zodiac-icon-ring li span[data-name]");
if (zodiacSpans.length > 0) {
  const zodiacSideLabel = document.querySelector("#zodiac-wheel .zodiac-side-label");
  const zodiacWheelCard = document.querySelector("#zodiac-wheel .zodiac-wheel-card");
  let activeLabelSpan = null;
  let labelAnimFrameId = null;
  const monthName = new Intl.DateTimeFormat("th-TH", { month: "long" }).format(new Date());
  const zodiacByName = {
    เมษ: { icon: "♈", work: "งานเดินหน้าเร็ว ได้เริ่มสิ่งใหม่", money: "มีรายจ่ายฉุกเฉินเล็กน้อย ควรวางแผน", love: "สื่อสารตรงไปตรงมาจะดีมาก", tip: "โฟกัสเป้าหมายหลักเพียง 1-2 เรื่อง", videoTitle: "ดวงราศีเมษ เดือนนี้", videoDesc: "แนวโน้มการงาน การเงิน และความรักของชาวเมษ", videoHref: "https://www.youtube.com/@horapatana/videos" },
    พฤษภ: { icon: "♉", work: "มีโอกาสได้รับความไว้วางใจเพิ่ม", money: "กระแสเงินค่อนข้างนิ่ง มีเก็บมากขึ้น", love: "คนโสดมีคนเข้ามาจากงานหรือเพื่อน", tip: "ตัดรายจ่ายฟุ่มเฟือยจะเห็นผลชัด", videoTitle: "ดวงราศีพฤษภ เดือนนี้", videoDesc: "สรุปดวงรายเดือนพร้อมข้อควรระวังของชาวพฤษภ", videoHref: "https://www.youtube.com/@horapatana/videos" },
    เมถุน: { icon: "♊", work: "เด่นเรื่องเจรจาและการประสานงาน", money: "ได้เงินจากงานเสริมหรือโปรเจกต์ย่อย", love: "ระวังคิดมาก ให้คุยกันอย่างใจเย็น", tip: "จดงานรายวันช่วยลดความล้า", videoTitle: "ดวงราศีเมถุน เดือนนี้", videoDesc: "ภาพรวมจังหวะชีวิตของชาวเมถุนในเดือนนี้", videoHref: "https://www.youtube.com/@horapatana/videos" },
    กรกฎ: { icon: "♋", work: "มีงานละเอียด ต้องตรวจซ้ำก่อนส่ง", money: "ค่าใช้จ่ายบ้าน/ครอบครัวเด่นขึ้น", love: "ความสัมพันธ์อบอุ่นขึ้นเมื่อให้เวลา", tip: "พักผ่อนให้พอแล้วงานจะไหลลื่น", videoTitle: "ดวงราศีกรกฎ เดือนนี้", videoDesc: "เช็กดวงรายเดือนสำหรับชาวกรกฎแบบละเอียด", videoHref: "https://www.youtube.com/@horapatana/videos" },
    สิงห์: { icon: "♌", work: "มีจังหวะโชว์ความสามารถต่อทีม", money: "มีลุ้นรายรับพิเศษหรือโบนัสย่อย", love: "เสน่ห์เด่น คนรอบตัวเข้าหาง่าย", tip: "อย่ารับงานเกินกำลังของตัวเอง", videoTitle: "ดวงราศีสิงห์ เดือนนี้", videoDesc: "แนวทางเสริมดวงและวางแผนชีวิตของชาวสิงห์", videoHref: "https://www.youtube.com/@horapatana/videos" },
    กันย์: { icon: "♍", work: "เหมาะกับการจัดระบบและแก้ปัญหา", money: "รายรับปกติ แต่ควรสำรองเงินฉุกเฉิน", love: "ค่อยๆ เปิดใจ ความสัมพันธ์จะมั่นคง", tip: "วางแผนรายสัปดาห์จะช่วยมาก", videoTitle: "ดวงราศีกันย์ เดือนนี้", videoDesc: "สรุปดวงประจำเดือนสำหรับชาวกันย์", videoHref: "https://www.youtube.com/@horapatana/videos" },
    ตุล: { icon: "♎", work: "เด่นงานทีมและงานที่ต้องบาลานซ์", money: "มีรายจ่ายเรื่องภาพลักษณ์/อุปกรณ์", love: "มีเกณฑ์ได้คุยเคลียร์ใจแล้วดีขึ้น", tip: "ตัดสินใจให้ชัด ลดการลังเล", videoTitle: "ดวงราศีตุล เดือนนี้", videoDesc: "ภาพรวมการเงิน การงาน ความรักของชาวตุล", videoHref: "https://www.youtube.com/@horapatana/videos" },
    พิจิก: { icon: "♏", work: "งานใหญ่ต้องใช้สมาธิและความอดทน", money: "มีโอกาสเงินก้อนจากงานเก่า", love: "ต้องการความชัดเจนมากขึ้นในความสัมพันธ์", tip: "หลีกเลี่ยงการตอบโต้ด้วยอารมณ์", videoTitle: "ดวงราศีพิจิก เดือนนี้", videoDesc: "คำแนะนำรายเดือนของชาวพิจิกแบบกระชับ", videoHref: "https://www.youtube.com/@horapatana/videos" },
    ธนู: { icon: "♐", work: "เด่นเรื่องเรียนรู้และขยับทักษะใหม่", money: "มีเกณฑ์ใช้เงินกับการเดินทาง/การเรียน", love: "คนโสดมีเกณฑ์เจอคนไลฟ์สไตล์ใกล้กัน", tip: "จัดสมดุลงานกับเวลาส่วนตัว", videoTitle: "ดวงราศีธนู เดือนนี้", videoDesc: "เช็กจังหวะดวงรายเดือนของชาวธนู", videoHref: "https://www.youtube.com/@horapatana/videos" },
    มังกร: { icon: "♑", work: "มีโอกาสเลื่อนบทบาทหรือรับหน้าที่สำคัญ", money: "วางแผนการเงินระยะยาวได้ดี", love: "ความสัมพันธ์จริงจังและมั่นคงขึ้น", tip: "พักเบรกระหว่างวันเพื่อลดความเครียด", videoTitle: "ดวงราศีมังกร เดือนนี้", videoDesc: "แนวโน้มดวงรายเดือนของชาวมังกร", videoHref: "https://www.youtube.com/@horapatana/videos" },
    กุมภ์: { icon: "♒", work: "ไอเดียใหม่ๆ ได้รับการยอมรับ", money: "รายจ่ายเกี่ยวกับเทคโนโลยีเด่น", love: "คุยกันแบบเพื่อนจะเข้าใจกันมากขึ้น", tip: "คัดกรองงานที่ไม่จำเป็นออกบ้าง", videoTitle: "ดวงราศีกุมภ์ เดือนนี้", videoDesc: "เจาะดวงรายเดือนและสิ่งที่ต้องโฟกัสของชาวกุมภ์", videoHref: "https://www.youtube.com/@horapatana/videos" },
    มีน: { icon: "♓", work: "งานสร้างสรรค์โดดเด่นเป็นพิเศษ", money: "ควรแยกบัญชีใช้จ่ายให้ชัดเจน", love: "อ่อนไหวง่าย ควรสื่อสารความรู้สึกตรงๆ", tip: "ทำสมาธิสั้นๆ จะช่วยให้โฟกัสดีขึ้น", videoTitle: "ดวงราศีมีน เดือนนี้", videoDesc: "สรุปดวงรายเดือนของชาวมีนพร้อมคำแนะนำ", videoHref: "https://www.youtube.com/@horapatana/videos" },
  };

  let popupOverlay = document.querySelector(".zodiac-popup-overlay");
  if (!popupOverlay) {
    popupOverlay = document.createElement("div");
    popupOverlay.className = "zodiac-popup-overlay";
    popupOverlay.innerHTML = `
      <div class="zodiac-popup" role="dialog" aria-modal="true" aria-label="คำพยากรณ์ราศีประจำเดือน">
        <button class="zodiac-popup-close" type="button" aria-label="ปิดหน้าต่าง">×</button>
        <h3 class="zodiac-popup-title"></h3>
        <p class="zodiac-popup-subtitle"></p>
        <ul class="zodiac-popup-list"></ul>
        <a class="zodiac-popup-video-card" href="#" target="_blank" rel="noreferrer">
          <h4 class="zodiac-popup-video-title"></h4>
          <p class="zodiac-popup-video-desc"></p>
          <span class="zodiac-popup-video-link">เปิดบน YouTube</span>
        </a>
      </div>
    `;
    document.body.appendChild(popupOverlay);
  }

  const popupTitle = popupOverlay.querySelector(".zodiac-popup-title");
  const popupSubtitle = popupOverlay.querySelector(".zodiac-popup-subtitle");
  const popupList = popupOverlay.querySelector(".zodiac-popup-list");
  const popupVideoCard = popupOverlay.querySelector(".zodiac-popup-video-card");
  const popupVideoTitle = popupOverlay.querySelector(".zodiac-popup-video-title");
  const popupVideoDesc = popupOverlay.querySelector(".zodiac-popup-video-desc");
  const popupClose = popupOverlay.querySelector(".zodiac-popup-close");
  const closePopup = () => popupOverlay.classList.remove("is-open");

  zodiacSpans.forEach((span) => {
    span.setAttribute("role", "button");
    span.setAttribute("tabindex", "0");
    const signName = span.getAttribute("data-name") || "";
    const positionSideLabel = () => {
      if (!zodiacSideLabel || !zodiacWheelCard) return;
      const cardRect = zodiacWheelCard.getBoundingClientRect();
      const spanRect = span.getBoundingClientRect();
      const labelWidth = zodiacSideLabel.offsetWidth || 120;
      const gap = 10;
      const left = spanRect.left - cardRect.left + spanRect.width + gap;
      const clampedLeft = Math.min(left, cardRect.width - labelWidth - 8);
      const top = spanRect.top - cardRect.top + spanRect.height / 2;
      zodiacSideLabel.style.left = `${Math.max(8, clampedLeft)}px`;
      zodiacSideLabel.style.top = `${top}px`;
    };
    const trackSideLabel = () => {
      if (!activeLabelSpan) return;
      positionSideLabel();
      labelAnimFrameId = window.requestAnimationFrame(trackSideLabel);
    };
    const showSideLabel = () => {
      if (!zodiacSideLabel || !signName) return;
      activeLabelSpan = span;
      zodiacSideLabel.textContent = `ราศี${signName}`;
      positionSideLabel();
      zodiacSideLabel.classList.add("is-visible");
      if (labelAnimFrameId) window.cancelAnimationFrame(labelAnimFrameId);
      labelAnimFrameId = window.requestAnimationFrame(trackSideLabel);
    };
    const hideSideLabel = () => {
      zodiacSideLabel?.classList.remove("is-visible");
      activeLabelSpan = null;
      if (labelAnimFrameId) {
        window.cancelAnimationFrame(labelAnimFrameId);
        labelAnimFrameId = null;
      }
    };
    const openPopup = () => {
      const signData = zodiacByName[signName];
      if (!signData) return;
      popupTitle.textContent = `${signData.icon} ราศี${signName}`;
      popupSubtitle.textContent = `คำแนะนำประจำเดือน${monthName}`;
      popupList.innerHTML = `
        <li><strong>การงาน:</strong> ${signData.work}</li>
        <li><strong>การเงิน:</strong> ${signData.money}</li>
        <li><strong>ความรัก:</strong> ${signData.love}</li>
        <li><strong>คำแนะนำ:</strong> ${signData.tip}</li>
      `;
      if (popupVideoCard && popupVideoTitle && popupVideoDesc) {
        popupVideoCard.setAttribute("href", signData.videoHref);
        popupVideoTitle.textContent = signData.videoTitle;
        popupVideoDesc.textContent = signData.videoDesc;
      }
      popupOverlay.classList.add("is-open");
    };
    span.addEventListener("mouseenter", showSideLabel);
    span.addEventListener("mouseleave", hideSideLabel);
    span.addEventListener("focus", showSideLabel);
    span.addEventListener("blur", hideSideLabel);
    span.addEventListener("click", openPopup);
    span.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPopup();
      }
    });
  });

  popupClose?.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) closePopup();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopup();
  });
}
