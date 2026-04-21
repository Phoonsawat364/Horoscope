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
