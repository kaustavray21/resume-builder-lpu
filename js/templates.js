export function generateGeneralHTML(data) {
  const linkedinUser = data.personal.linkedin.split("/").filter(Boolean).pop();
  const githubUser = data.personal.github.split("/").filter(Boolean).pop();

  let html = `
      <div class="p-10">
          <header class="flex justify-between items-end mb-10">
              <div class="text-left">
                  <h1 class="font-bold text-blue-900">${data.personal.name}</h1>
                  <div class="mt-2">
                      <a href="${data.personal.linkedin}" class="text-gray-700 block hover:underline"><strong class="text-blue-900/80">LinkedIn:</strong> ${linkedinUser}</a>
                      <a href="${data.personal.github}" class="text-gray-700 block hover:underline"><strong class="text-blue-900/80">GitHub:</strong> ${githubUser}</a>
                  </div>
              </div>
              <div class="text-right">
                  <a href="mailto:${data.personal.email}" class="text-gray-700 block hover:underline"><strong class="text-blue-900/80">Email:</strong> ${data.personal.email}</a>
                  <a href="tel:${data.personal.mobile}" class="text-gray-700 block hover:underline"><strong class="text-blue-900/80">Mobile:</strong> ${data.personal.mobile}</a>
              </div>
          </header>

          <section class="mb-8">
              <h2 class="font-bold text-blue-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">Skills</h2>
              <div class="space-y-1">
                  <div class="flex"><strong class="font-semibold w-48 flex-shrink-0 text-blue-900/80">Languages:</strong><span class="text-gray-800">${data.skills.languages}</span></div>
                  <div class="flex"><strong class="font-semibold w-48 flex-shrink-0 text-blue-900/80">Frameworks:</strong><span class="text-gray-800">${data.skills.frameworks}</span></div>
                   <div class="flex"><strong class="font-semibold w-48 flex-shrink-0 text-blue-900/80">Databases:</strong><span class="text-gray-800">${data.skills.databases}</span></div>
                  <div class="flex"><strong class="font-semibold w-48 flex-shrink-0 text-blue-900/80">Tools:</strong><span class="text-gray-800">${data.skills.tools}</span></div>
                  <div class="flex"><strong class="font-semibold w-48 flex-shrink-0 text-blue-900/80">Other Skills:</strong><span class="text-gray-800">${data.skills.softskills}</span></div>
              </div>
          </section>
  `;

  if (data.projects.length > 0) {
    html += `<section class="mb-8"><h2 class="font-bold text-blue-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">Projects</h2>`;
    data.projects.forEach((p) => {
      html += `
              <div class="mb-6">
                  <div class="flex justify-between items-center"><h3 class="font-bold text-gray-900">${
                    p.title
                  }</h3><p class="text-gray-600 text-sm">${p.date}</p></div>
                  <p class="italic text-gray-600 mb-2">${p.tech}</p>
                  <ul class="list-disc pl-5 space-y-1 text-gray-700">
                      ${p.desc.map((d) => `<li>${d}</li>`).join("")}
                  </ul>
              </div>`;
    });
    html += `</section>`;
  }

  if (data.certifications.length > 0) {
    html += `<section class="mb-8"><h2 class="font-bold text-blue-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">Certification</h2><ul class="list-disc pl-5 text-gray-800">`;
    data.certifications.forEach((c) => {
      html += `<li><div class="flex justify-between items-center"><p>${c.title}</p><p class="text-gray-600">${c.date}</p></div></li>`;
    });
    html += `</ul></section>`;
  }

  if (data.achievements.length > 0) {
    html += `<section class="mb-8"><h2 class="font-bold text-blue-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">Achievements</h2><ul class="list-disc pl-5 space-y-2 text-gray-800">`;
    data.achievements.forEach((a) => {
      html += `<li><div class="flex justify-between items-center"><p>${a.title}</p><p class="text-gray-600">${a.date}</p></div></li>`;
    });
    html += `</ul></section>`;
  }

  if (data.education.length > 0) {
    html += `<section class="mb-8"><h2 class="font-bold text-blue-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">Education</h2><ul class="list-disc pl-5 space-y-3">`;
    data.education.forEach((e) => {
      html += `
              <li>
                  <div>
                      <div class="flex justify-between items-center"><h3 class="font-bold text-gray-900">${e.school}</h3><p class="text-gray-600">${e.location}</p></div>
                      <div class="flex justify-between items-center"><p class="italic text-gray-700">${e.degree}</p><p class="text-gray-600">${e.dates}</p></div>
                  </div>
              </li>`;
    });
    html += `</ul></section>`;
  }

  if (data.hobbies) {
    html += `
          <section>
              <h2 class="font-bold text-blue-900 uppercase border-b-2 border-gray-300 pb-2 mb-4">Hobbies and Interest</h2>
              <ul class="list-disc pl-5 space-y-1 text-gray-800">
                  ${data.hobbies
                    .split(",")
                    .map((hobby) => `<li>${hobby.trim()}</li>`)
                    .join("")}
              </ul>
          </section>
      `;
  }

  html += `</div>`;
  return html;
}

export function generateCompanySpecificHTML(data) {
  const linkedinUser = data.personal.linkedin.split("/").filter(Boolean).pop();
  const githubUser = data.personal.github.split("/").filter(Boolean).pop();

  let html = `<div class="p-8 font-sans">
        <header class="text-center mb-6">
            <h1 class="text-3xl font-semibold tracking-wider">${data.personal.name}</h1>
            <p class="text-sm text-gray-600 mt-2">${data.personal.location}</p>
            <div class="text-xs text-gray-800 mt-2 flex flex-nowrap justify-center items-center space-x-4">
                <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                    ${data.personal.mobile}
                </span>
                <a href="mailto:${data.personal.email}" class="flex items-center text-blue-600 hover:underline">
                    <svg class="w-4 h-4 mr-1.5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    ${data.personal.email}
                </a>
                <a href="${data.personal.linkedin}" class="flex items-center text-blue-600 hover:underline">
                     <svg class="w-4 h-4 mr-1.5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    linkedin.com/in/${linkedinUser}
                </a>
                <a href="${data.personal.github}" class="flex items-center text-blue-600 hover:underline">
                    <svg class="w-4 h-4 mr-1.5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    github.com/${githubUser}
                </a>
            </div>
        </header>
    `;

  if (data.projects.length > 0) {
    html += `<section class="mb-6">
            <h2 class="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
            <div class="space-y-4">`;
    data.projects.forEach((p) => {
      html += `<div>
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold text-md">${
                      p.title
                    } | <span class="font-normal italic text-gray-600 text-sm">${
        p.tech
      }</span></h3>
                    <p class="text-sm text-gray-600">${p.date}</p>
                </div>
                <ul class="list-disc pl-5 text-sm space-y-1">
                    ${p.desc.map((d) => `<li>${d}</li>`).join("")}
                </ul>
            </div>`;
    });
    html += `</div></section>`;
  }

  if (data.certifications.length > 0) {
    html += `<section class="mb-6">
            <h2 class="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Certificates</h2>
            <ul class="list-disc pl-5 text-sm space-y-1">`;
    data.certifications.forEach((c) => {
      html += `<li><strong>${c.title}</strong> — <span class="text-gray-600">${c.date}</span></li>`;
    });
    html += `</ul></section>`;
  }

  html += `<section class="mb-6">
        <h2 class="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Technical Skills</h2>
        <ul class="list-disc pl-5 text-sm space-y-1">
            <li><strong class="font-semibold">Languages:</strong> ${data.skills.languages}</li>
            <li><strong class="font-semibold">Libraries/Frameworks:</strong> ${data.skills.frameworks}</li>
            <li><strong class="font-semibold">Databases:</strong> ${data.skills.databases}</li>
            <li><strong class="font-semibold">Tools:</strong> ${data.skills.tools}</li>
            <li><strong class="font-semibold">Skills:</strong> ${data.skills.softskills}</li>
        </ul>
    </section>`;

  if (data.education.length > 0) {
    html += `<section>
            <h2 class="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
            <ul class="list-disc pl-5 text-sm space-y-3">`;
    data.education.forEach((e) => {
      html += `<li>
                <div class="flex justify-between">
                    <div>
                        <p class="font-bold">${e.school}</p>
                        <p class="italic text-gray-600">${e.degree}</p>
                    </div>
                    <div class="text-right">
                        <p>${e.location}</p>
                        <p class="text-gray-600">${e.dates}</p>
                    </div>
                </div>
                </li>`;
    });
    html += `</ul></section>`;
  }

  html += `</div>`;
  return html;
}

export function generateSectionHTML(type, index) {
  const fieldsetId = `${type.substring(0, 3)}_fieldset_${index}`;
  let sectionHtml = "";
  switch (type) {
    case "project":
      sectionHtml = `
              <fieldset id="${fieldsetId}" class="form-section relative">
                  <legend class="form-legend">Project ${index + 1}</legend>
                  <button type="button" class="remove-section-btn" data-target="${fieldsetId}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label class="form-label">Title</label><input type="text" id="project_title_${index}" class="form-input"></div>
                      <div><label class="form-label">Date</label><input type="text" id="project_date_${index}" class="form-input"></div>
                  </div>
                  <div class="mt-4"><label class="form-label">Tech Stack (comma-separated)</label><input type="text" id="project_tech_${index}" class="form-input"></div>
                  <div class="mt-4"><label class="form-label">Description (one point per line)</label><textarea id="project_desc_${index}" rows="3" class="form-input"></textarea></div>
              </fieldset>`;
      break;
    case "education":
      sectionHtml = `
              <fieldset id="${fieldsetId}" class="form-section relative">
                  <legend class="form-legend">Education ${index + 1}</legend>
                  <button type="button" class="remove-section-btn" data-target="${fieldsetId}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label class="form-label">School/University</label><input type="text" id="edu_school_${index}" class="form-input"></div>
                      <div><label class="form-label">Location</label><input type="text" id="edu_location_${index}" class="form-input"></div>
                      <div><label class="form-label">Degree/Course & Grade</label><input type="text" id="edu_degree_${index}" class="form-input"></div>
                      <div><label class="form-label">Dates</label><input type="text" id="edu_dates_${index}" class="form-input"></div>
                  </div>
              </fieldset>`;
      break;
    case "achievement":
      sectionHtml = `
              <fieldset id="${fieldsetId}" class="form-section relative">
                  <legend class="form-legend">Achievement ${index + 1}</legend>
                  <button type="button" class="remove-section-btn" data-target="${fieldsetId}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label class="form-label">Title</label><input type="text" id="ach_title_${index}" class="form-input"></div>
                      <div><label class="form-label">Date</label><input type="text" id="ach_date_${index}" class="form-input"></div>
                  </div>
              </fieldset>`;
      break;
    case "certification":
      sectionHtml = `
              <fieldset id="${fieldsetId}" class="form-section relative">
                  <legend class="form-legend">Certification ${
                    index + 1
                  }</legend>
                  <button type="button" class="remove-section-btn" data-target="${fieldsetId}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label class="form-label">Title</label><input type="text" id="cert_title_${index}" class="form-input"></div>
                      <div><label class="form-label">Date</label><input type="text" id="cert_date_${index}" class="form-input"></div>
                  </div>
              </fieldset>`;
      break;
  }
  return sectionHtml;
}
