export let sectionCounters = {
  project: 0,
  education: 0,
  achievement: 0,
  certification: 0,
  skill: 0,
};

export function getFormValues() {
  const values = {
    personal: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      linkedin: document.getElementById("linkedin").value,
      github: document.getElementById("github").value,
      location: document.getElementById("location").value,
    },
    skills: [],
    hobbies: document.getElementById("include_hobbies").checked
      ? document.getElementById("hobbies-input").value
      : "",
    projects: [],
    education: [],
    achievements: [],
    certifications: [],
  };

  for (let i = 0; i < sectionCounters.skill; i++) {
    if (document.getElementById(`skill_name_${i}`)) {
      values.skills.push({
        name: document.getElementById(`skill_name_${i}`).value,
        details: document.getElementById(`skill_details_${i}`).value,
      });
    }
  }

  for (let i = 0; i < sectionCounters.project; i++) {
    if (document.getElementById(`project_title_${i}`)) {
      values.projects.push({
        title: document.getElementById(`project_title_${i}`).value,
        date: document.getElementById(`project_date_${i}`).value,
        tech: document.getElementById(`project_tech_${i}`).value,
        desc: document.getElementById(`project_desc_${i}`).value.split("\n"),
      });
    }
  }
  for (let i = 0; i < sectionCounters.education; i++) {
    if (document.getElementById(`edu_school_${i}`)) {
      values.education.push({
        school: document.getElementById(`edu_school_${i}`).value,
        location: document.getElementById(`edu_location_${i}`).value,
        degree: document.getElementById(`edu_degree_${i}`).value,
        dates: document.getElementById(`edu_dates_${i}`).value,
        grade: document.getElementById(`edu_grade_${i}`).value,
        gradeType: document.getElementById(`edu_grade_type_${i}`).value,
      });
    }
  }
  for (let i = 0; i < sectionCounters.achievement; i++) {
    if (document.getElementById(`ach_title_${i}`)) {
      values.achievements.push({
        title: document.getElementById(`ach_title_${i}`).value,
        date: document.getElementById(`ach_date_${i}`).value,
      });
    }
  }
  for (let i = 0; i < sectionCounters.certification; i++) {
    if (document.getElementById(`cert_title_${i}`)) {
      values.certifications.push({
        title: document.getElementById(`cert_title_${i}`).value,
        date: document.getElementById(`cert_date_${i}`).value,
      });
    }
  }
  return values;
}
