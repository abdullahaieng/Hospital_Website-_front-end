
// ── DATA STORE ──
const STORAGE_KEYS = { doctors:'kc_doctors', patients:'kc_patients', appointments:'kc_appts', notes:'kc_notes', schedules:'kc_schedules' };

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

// ── INITIAL DATA ──
const DEFAULT_DOCTORS = [
  { id:'D001', name:'Dr. Sarah Ahmed', email:'sarah@kidcare.pk', phone:'+92-300-1111001', qual:'MBBS, DCH, FCPS', spec:'General Pediatrics', dept:'General Pediatrics', exp:8, schedule:'Mon-Fri 9AM-5PM', password:'doc123', color:'#1565c0', initials:'SA' },
  { id:'D002', name:'Dr. Ali Khan', email:'ali@kidcare.pk', phone:'+92-300-1111002', qual:'MBBS, MD, Child Psych', spec:'Developmental Pediatrics', dept:'Child Development', exp:10, schedule:'Mon-Wed-Fri 10AM-6PM', password:'doc123', color:'#00796b', initials:'AK' },
  { id:'D003', name:'Dr. Hina Malik', email:'hina@kidcare.pk', phone:'+92-300-1111003', qual:'MBBS, MCPS, MPH', spec:'Vaccination & Preventive Care', dept:'Vaccination & Preventive Care', exp:6, schedule:'Tue-Thu-Sat 9AM-4PM', password:'doc123', color:'#7b1fa2', initials:'HM' },
  { id:'D004', name:'Dr. Ahmed Raza', email:'ahmed@kidcare.pk', phone:'+92-300-1111004', qual:'MBBS, MS (Peds Surgery)', spec:'Pediatric Surgery', dept:'Pediatric Surgery', exp:12, schedule:'Mon-Tue-Thu 8AM-4PM', password:'doc123', color:'#b71c1c', initials:'AR' },
  { id:'D005', name:'Dr. Fatima Noor', email:'fatima@kidcare.pk', phone:'+92-300-1111005', qual:'MBBS, FCPS (Neonatal)', spec:'Neonatal & Pediatric Surgery', dept:'Neonatal & Pediatric Surgery', exp:9, schedule:'Mon-Wed-Fri-Sat 9AM-5PM', password:'doc123', color:'#e65100', initials:'FN' }
];

const DEFAULT_PATIENTS = [
  { id:'P001', name:'Zaid Ahmed', age:'7 years', gender:'Male', parent:'Mr. Kamran Ahmed', contact:'+92-300-2221001', address:'DHA Phase 5, Lahore', notes:'Mild asthma, Albuterol inhaler as needed' },
  { id:'P002', name:'Aisha Malik', age:'3 years', gender:'Female', parent:'Mrs. Sana Malik', contact:'+92-300-2221002', address:'Gulberg III, Lahore', notes:'No known allergies. Up to date on vaccinations.' },
  { id:'P003', name:'Omar Farooq', age:'12 years', gender:'Male', parent:'Mr. Imran Farooq', contact:'+92-300-2221003', address:'Cantt, Lahore', notes:'Type 1 Diabetes. Daily insulin. Monitor blood glucose.' },
  { id:'P004', name:'Sara Khan', age:'5 months', gender:'Female', parent:'Mrs. Nida Khan', contact:'+92-300-2221004', address:'Johar Town, Lahore', notes:'Premature birth. Neonatal follow-up required every 4 weeks.' },
  { id:'P005', name:'Hassan Ali', age:'9 years', gender:'Male', parent:'Mr. Tariq Ali', contact:'+92-300-2221005', address:'Model Town, Lahore', notes:'ADHD. On Methylphenidate 10mg.' },
  { id:'P006', name:'Fatima Baig', age:'2 years', gender:'Female', parent:'Mrs. Rabia Baig', contact:'+92-300-2221006', address:'Bahria Town, Lahore', notes:'Food allergy: peanuts. EpiPen prescribed.' },
];

const today = new Date();
const fmtDate = d => d.toISOString().split('T')[0];
const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
const dayAfter = new Date(today); dayAfter.setDate(today.getDate()+2);
const yesterday = new Date(today); yesterday.setDate(today.getDate()-1);

const DEFAULT_APPTS = [
  { id:'A001', patientId:'P001', patientName:'Zaid Ahmed', doctorId:'D001', doctorName:'Dr. Sarah Ahmed', dept:'General Pediatrics', date:fmtDate(today), time:'09:00', status:'Approved', notes:'Routine check-up and asthma review' },
  { id:'A002', patientId:'P002', patientName:'Aisha Malik', doctorId:'D003', doctorName:'Dr. Hina Malik', dept:'Vaccination & Preventive Care', date:fmtDate(today), time:'10:00', status:'Pending', notes:'18-month vaccination schedule' },
  { id:'A003', patientId:'P003', patientName:'Omar Farooq', doctorId:'D002', doctorName:'Dr. Ali Khan', dept:'Child Development', date:fmtDate(today), time:'11:00', status:'Completed', notes:'Developmental assessment' },
  { id:'A004', patientId:'P004', patientName:'Sara Khan', doctorId:'D005', doctorName:'Dr. Fatima Noor', dept:'Neonatal & Pediatric Surgery', date:fmtDate(tomorrow), time:'09:30', status:'Approved', notes:'Neonatal follow-up' },
  { id:'A005', patientId:'P005', patientName:'Hassan Ali', doctorId:'D002', doctorName:'Dr. Ali Khan', dept:'Child Development', date:fmtDate(tomorrow), time:'14:00', status:'Pending', notes:'ADHD follow-up appointment' },
  { id:'A006', patientId:'P006', patientName:'Fatima Baig', doctorId:'D004', doctorName:'Dr. Ahmed Raza', dept:'Pediatric Surgery', date:fmtDate(dayAfter), time:'10:30', status:'Pending', notes:'Pre-surgical consultation' },
  { id:'A007', patientId:'P001', patientName:'Zaid Ahmed', doctorId:'D001', doctorName:'Dr. Sarah Ahmed', dept:'General Pediatrics', date:fmtDate(yesterday), time:'11:00', status:'Completed', notes:'Follow-up' },
];

const DEFAULT_NOTES = [
  { id:'N001', patientId:'P001', patientName:'Zaid Ahmed', doctorId:'D001', doctorName:'Dr. Sarah Ahmed', date:fmtDate(yesterday), diagnosis:'Mild Persistent Asthma', text:'Patient presents with mild wheezing. Peak flow 75% of predicted. Continue Albuterol inhaler PRN. Advised to avoid cold air triggers. Follow-up in 4 weeks.', status:'Follow-up required' },
  { id:'N002', patientId:'P003', patientName:'Omar Farooq', doctorId:'D002', doctorName:'Dr. Ali Khan', date:fmtDate(today), diagnosis:'ADHD — Monitoring', text:'Methylphenidate 10mg showing positive effect on attention span. Teacher reports improved classroom behavior. Continue current dose. Review in 8 weeks.', status:'Ongoing' },
];

// Init data if not exists
function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.doctors)) save(STORAGE_KEYS.doctors, DEFAULT_DOCTORS);
  if (!localStorage.getItem(STORAGE_KEYS.patients)) save(STORAGE_KEYS.patients, DEFAULT_PATIENTS);
  if (!localStorage.getItem(STORAGE_KEYS.appointments)) save(STORAGE_KEYS.appointments, DEFAULT_APPTS);
  if (!localStorage.getItem(STORAGE_KEYS.notes)) save(STORAGE_KEYS.notes, DEFAULT_NOTES);
  if (!localStorage.getItem(STORAGE_KEYS.schedules)) save(STORAGE_KEYS.schedules, {});
}

// ── AUTH ──
let currentUser = null;
let loginRole = 'admin';
const ADMIN = { email:'admin@kidcare.pk', password:'admin123', name:'Dr. Admin', role:'admin' };

function openLoginModal() {
  document.getElementById('login-modal').classList.add('active');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').style.display = 'none';
}
function closeLoginModal() { document.getElementById('login-modal').classList.remove('active'); }
function setLoginRole(role, btn) {
  loginRole = role;
  document.querySelectorAll('.role-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (role === 'admin') {
    document.getElementById('login-hint').innerHTML = '<strong>Admin:</strong> admin@kidcare.pk / admin123';
  } else {
    document.getElementById('login-hint').innerHTML = '<strong>Doctors:</strong> sarah@kidcare.pk / doc123<br>ali@kidcare.pk / doc123 &nbsp;|&nbsp; hina@kidcare.pk / doc123<br>ahmed@kidcare.pk / doc123 &nbsp;|&nbsp; fatima@kidcare.pk / doc123';
  }
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  document.getElementById('login-error').style.display = 'none';

  if (loginRole === 'admin') {
    if (email === ADMIN.email && pass === ADMIN.password) {
      currentUser = { ...ADMIN };
      launchApp();
    } else {
      document.getElementById('login-error').style.display = 'block';
    }
  } else {
    const doctors = load(STORAGE_KEYS.doctors);
    const doc = doctors.find(d => d.email === email && d.password === pass);
    if (doc) {
      currentUser = { ...doc, role: 'doctor' };
      launchApp();
    } else {
      document.getElementById('login-error').style.display = 'block';
    }
  }
}

function doLogout() {
  currentUser = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('public-site').style.display = 'block';
  showSection('home');
  showToast('You have been logged out.', '');
}

function launchApp() {
  closeLoginModal();
  document.getElementById('public-site').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  // Set user info in sidebar
  document.getElementById('sidebar-user-name').textContent = currentUser.name;
  document.getElementById('sidebar-user-role').textContent = currentUser.role === 'admin' ? 'Administrator' : currentUser.dept || 'Physician';
  document.getElementById('sidebar-avatar-text').textContent = currentUser.initials || currentUser.name.substring(0,2).toUpperCase();

  if (currentUser.role === 'admin') {
    document.getElementById('admin-nav').style.display = 'block';
    document.getElementById('doctor-nav').style.display = 'none';
    showPanel('dashboard', document.querySelector('#admin-nav .sidebar-link'));
    refreshDashboard();
  } else {
    document.getElementById('admin-nav').style.display = 'none';
    document.getElementById('doctor-nav').style.display = 'block';
    document.getElementById('doc-dash-title').textContent = 'Welcome, ' + currentUser.name;
    showPanel('doc-dashboard', document.querySelector('#doctor-nav .sidebar-link'));
    refreshDocDashboard();
  }
  updateTopbarDate();
}

// ── NAVIGATION ──
function showSection(sec) {
  const sections = ['home','about','services','doctors','contact','booking'];
  sections.forEach(s => {
    const el = document.getElementById('sec-'+s);
    if (el) el.style.display = s === sec ? 'block' : 'none';
  });
  window.scrollTo(0, 0);
}

function showPanel(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const panel = document.getElementById('panel-'+id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');

  const titles = {
    'dashboard':'Dashboard', 'doctors-mgmt':'Doctor Management', 'patients-mgmt':'Patient Management',
    'appointments-mgmt':'Appointment Management', 'schedule-mgmt':'Schedule Management', 'reports':'Analytics & Reports',
    'doc-dashboard':'My Dashboard', 'doc-appointments':'My Appointments', 'doc-patients':'My Patients',
    'doc-schedule':'My Schedule', 'doc-notes':'Notes & Records'
  };
  document.getElementById('topbar-title').textContent = titles[id] || 'KidCare';

  // Lazy render
  if (id === 'doctors-mgmt') renderDoctorsTable();
  if (id === 'patients-mgmt') renderPatientsTable();
  if (id === 'appointments-mgmt') renderApptsTable();
  if (id === 'schedule-mgmt') renderSchedulePanel();
  if (id === 'reports') renderReports();
  if (id === 'doc-appointments') renderDocAppts();
  if (id === 'doc-patients') renderDocPatients();
  if (id === 'doc-schedule') renderDocSchedule();
  if (id === 'doc-notes') renderNotes();
}

function updateTopbarDate() {
  const now = new Date();
  document.getElementById('topbar-date').textContent = now.toLocaleDateString('en-PK', {weekday:'short',year:'numeric',month:'short',day:'numeric'});
}

// ── DASHBOARD ──
function refreshDashboard() {
  const doctors = load(STORAGE_KEYS.doctors);
  const patients = load(STORAGE_KEYS.patients);
  const appts = load(STORAGE_KEYS.appointments);
  const todayStr = fmtDate(new Date());

  document.getElementById('stat-doctors').textContent = doctors.length;
  document.getElementById('stat-patients').textContent = patients.length;
  const todayAppts = appts.filter(a => a.date === todayStr);
  document.getElementById('stat-today').textContent = todayAppts.length;
  document.getElementById('stat-total-appts').textContent = appts.length;
  document.getElementById('today-date-label').textContent = new Date().toLocaleDateString('en-PK',{weekday:'long',month:'short',day:'numeric'});

  // Today's table
  const tbody = document.getElementById('today-appts-table');
  if (todayAppts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--text-3)">No appointments today</td></tr>';
  } else {
    tbody.innerHTML = todayAppts.map(a => `
      <tr>
        <td><span class="td-mono">${a.time}</span></td>
        <td class="td-name">${a.patientName}</td>
        <td>${a.doctorName}</td>
        <td>${statusBadge(a.status)}</td>
      </tr>`).join('');
  }

  // Notifications
  const notifs = [
    { color:'#1976d2', text:'New appointment request from Zaid Ahmed for Dr. Sarah Ahmed', time:'9 min ago' },
    { color:'#0f9d58', text:'Appointment A003 completed — Dr. Ali Khan', time:'45 min ago' },
    { color:'#f57c00', text:'Dr. Hina Malik schedule updated for next week', time:'2h ago' },
    { color:'#c62828', text:'Appointment A005 requires approval', time:'3h ago' },
  ];
  document.getElementById('notif-list').innerHTML = notifs.map(n => `
    <div class="notif-item">
      <div class="notif-dot" style="background:${n.color}"></div>
      <div class="notif-text">${n.text}</div>
      <div class="notif-time">${n.time}</div>
    </div>`).join('');

  // Charts
  renderWeeklyChart();
  renderDeptChart();
}

let weeklyChartInstance = null;
let deptChartInstance = null;

function renderWeeklyChart() {
  const ctx = document.getElementById('chart-weekly');
  if (!ctx) return;
  if (weeklyChartInstance) weeklyChartInstance.destroy();
  const days = [];
  const counts = [];
  const appts = load(STORAGE_KEYS.appointments);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const s = fmtDate(d);
    days.push(d.toLocaleDateString('en',{weekday:'short'}));
    counts.push(appts.filter(a => a.date === s).length + (i === 0 ? 0 : Math.floor(Math.random()*2)));
  }
  weeklyChartInstance = new Chart(ctx, {
    type: 'bar',
    data: { labels: days, datasets: [{ label: 'Appointments', data: counts, backgroundColor: '#bbdefb', borderColor: '#1976d2', borderWidth: 2, borderRadius: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f0f4f8' } }, x: { grid: { display: false } } } }
  });
}

function renderDeptChart() {
  const ctx = document.getElementById('chart-dept');
  if (!ctx) return;
  if (deptChartInstance) deptChartInstance.destroy();
  const appts = load(STORAGE_KEYS.appointments);
  const depts = {};
  appts.forEach(a => { depts[a.dept] = (depts[a.dept]||0) + 1; });
  const labels = Object.keys(depts);
  const data = Object.values(depts);
  deptChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: ['#bbdefb','#b2dfdb','#e1bee7','#ffccbc','#c8e6c9'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, boxWidth: 12 } } } }
  });
}

// ── DOCTOR DASHBOARD ──
function refreshDocDashboard() {
  const appts = load(STORAGE_KEYS.appointments);
  const patients = load(STORAGE_KEYS.patients);
  const notes = load(STORAGE_KEYS.notes);
  const todayStr = fmtDate(new Date());
  const myAppts = appts.filter(a => a.doctorId === currentUser.id);
  const todayMine = myAppts.filter(a => a.date === todayStr);
  const upcoming = myAppts.filter(a => a.date > todayStr);
  const myPatientIds = [...new Set(myAppts.map(a => a.patientId))];
  const myNotes = notes.filter(n => n.doctorId === currentUser.id);

  document.getElementById('doc-stat-today').textContent = todayMine.length;
  document.getElementById('doc-stat-upcoming').textContent = upcoming.length;
  document.getElementById('doc-stat-patients').textContent = myPatientIds.length;
  document.getElementById('doc-stat-notes').textContent = myNotes.length;

  // Today table
  const todayTbody = document.getElementById('doc-today-table');
  if (todayMine.length === 0) {
    todayTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-3)">No appointments today</td></tr>';
  } else {
    todayTbody.innerHTML = todayMine.map(a => {
      const pat = patients.find(p => p.id === a.patientId) || {};
      return `<tr>
        <td><span class="td-mono">${a.time}</span></td>
        <td class="td-name">${a.patientName}</td>
        <td>${pat.age || '—'}</td>
        <td style="font-size:0.8rem;color:var(--text-3)">${(a.notes||'').substring(0,30)}${a.notes&&a.notes.length>30?'...':''}</td>
        <td>${statusBadge(a.status)}</td>
        <td>
          ${a.status === 'Pending' ? `<button class="btn btn-success btn-sm" onclick="updateApptStatus('${a.id}','Approved')">Accept</button>` : ''}
          ${a.status === 'Approved' ? `<button class="btn btn-blue btn-sm" onclick="updateApptStatus('${a.id}','Completed')">Complete</button>` : ''}
        </td>
      </tr>`;
    }).join('');
  }

  // Upcoming
  const upTbody = document.getElementById('doc-upcoming-table');
  if (upcoming.length === 0) {
    upTbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-3)">No upcoming appointments</td></tr>';
  } else {
    upTbody.innerHTML = upcoming.slice(0,6).map(a => `
      <tr>
        <td>${new Date(a.date).toLocaleDateString('en',{month:'short',day:'numeric'})}</td>
        <td><span class="td-mono">${a.time}</span></td>
        <td class="td-name">${a.patientName}</td>
        <td>${statusBadge(a.status)}</td>
      </tr>`).join('');
  }
}

// ── DOCTORS TABLE ──
function renderDoctorsTable() {
  const doctors = load(STORAGE_KEYS.doctors);
  const search = document.getElementById('search-doctors').value.toLowerCase();
  const dept = document.getElementById('filter-dept').value;
  const filtered = doctors.filter(d =>
    (!search || d.name.toLowerCase().includes(search) || d.email.toLowerCase().includes(search)) &&
    (!dept || d.dept === dept)
  );
  const tbody = document.getElementById('doctors-table-body');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-3)">No doctors found</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(d => `
    <tr>
      <td class="td-mono">${d.id}</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="avatar" style="background:${d.color||'#1565c0'}">${d.initials||d.name.substring(0,2).toUpperCase()}</div>
          <div><div class="td-name">${d.name}</div><div style="font-size:0.75rem;color:var(--text-3)">${d.email}</div></div>
        </div>
      </td>
      <td style="font-size:0.8rem">${d.qual||'—'}</td>
      <td><span class="badge badge-blue">${d.dept}</span></td>
      <td style="font-size:0.8rem">${d.phone||'—'}</td>
      <td>${d.exp ? d.exp+' yrs' : '—'}</td>
      <td style="font-size:0.8rem;color:var(--text-3)">${d.schedule||'—'}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="editDoctor('${d.id}')">Edit</button>
        <button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="deleteDoctor('${d.id}')">Del</button>
      </td>
    </tr>`).join('');
}

function openDoctorModal(doctorId) {
  document.getElementById('doctor-modal').classList.add('active');
  document.getElementById('doctor-modal-title').textContent = doctorId ? 'Edit Doctor' : 'Add New Doctor';
  const fields = ['name','email','phone','qual','spec','dept','exp','schedule','password'];
  fields.forEach(f => document.getElementById('d-'+f).value = '');
  document.getElementById('doctor-modal')._editId = null;

  if (doctorId) {
    const doc = load(STORAGE_KEYS.doctors).find(d => d.id === doctorId);
    if (doc) {
      document.getElementById('d-name').value = doc.name||'';
      document.getElementById('d-email').value = doc.email||'';
      document.getElementById('d-phone').value = doc.phone||'';
      document.getElementById('d-qual').value = doc.qual||'';
      document.getElementById('d-spec').value = doc.spec||'';
      document.getElementById('d-dept').value = doc.dept||'';
      document.getElementById('d-exp').value = doc.exp||'';
      document.getElementById('d-schedule').value = doc.schedule||'';
      document.getElementById('doctor-modal')._editId = doctorId;
    }
  }
}
function closeDoctorModal() { document.getElementById('doctor-modal').classList.remove('active'); }
function editDoctor(id) { openDoctorModal(id); }

function saveDoctor() {
  const name = document.getElementById('d-name').value.trim();
  const email = document.getElementById('d-email').value.trim();
  if (!name || !email) { showToast('Name and email are required','error'); return; }
  const doctors = load(STORAGE_KEYS.doctors);
  const editId = document.getElementById('doctor-modal')._editId;
  const colors = ['#1565c0','#00796b','#7b1fa2','#b71c1c','#e65100','#00838f','#558b2f'];

  if (editId) {
    const idx = doctors.findIndex(d => d.id === editId);
    if (idx >= 0) {
      const pass = document.getElementById('d-password').value;
      doctors[idx] = { ...doctors[idx],
        name, email,
        phone: document.getElementById('d-phone').value,
        qual: document.getElementById('d-qual').value,
        spec: document.getElementById('d-spec').value,
        dept: document.getElementById('d-dept').value,
        exp: document.getElementById('d-exp').value,
        schedule: document.getElementById('d-schedule').value,
        initials: name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase(),
        ...(pass ? {password:pass} : {})
      };
      showToast('Doctor updated successfully','success');
    }
  } else {
    const newId = 'D' + String(doctors.length + 1).padStart(3,'0');
    const pass = document.getElementById('d-password').value || 'doc123';
    doctors.push({
      id: newId, name, email,
      phone: document.getElementById('d-phone').value,
      qual: document.getElementById('d-qual').value,
      spec: document.getElementById('d-spec').value,
      dept: document.getElementById('d-dept').value,
      exp: document.getElementById('d-exp').value,
      schedule: document.getElementById('d-schedule').value,
      password: pass,
      color: colors[doctors.length % colors.length],
      initials: name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase()
    });
    showToast('Doctor added successfully','success');
  }
  save(STORAGE_KEYS.doctors, doctors);
  closeDoctorModal();
  renderDoctorsTable();
  refreshDashboard();
}

function deleteDoctor(id) {
  if (!confirm('Delete this doctor? This cannot be undone.')) return;
  const doctors = load(STORAGE_KEYS.doctors).filter(d => d.id !== id);
  save(STORAGE_KEYS.doctors, doctors);
  renderDoctorsTable();
  refreshDashboard();
  showToast('Doctor removed','error');
}

// ── PATIENTS TABLE ──
function renderPatientsTable() {
  const patients = load(STORAGE_KEYS.patients);
  const search = document.getElementById('search-patients').value.toLowerCase();
  const gender = document.getElementById('filter-gender').value;
  const filtered = patients.filter(p =>
    (!search || p.name.toLowerCase().includes(search) || (p.id||'').toLowerCase().includes(search) || (p.contact||'').includes(search)) &&
    (!gender || p.gender === gender)
  );
  const tbody = document.getElementById('patients-table-body');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-3)">No patients found</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td class="td-mono">${p.id}</td>
      <td class="td-name">${p.name}</td>
      <td>${p.age||'—'}</td>
      <td><span class="badge ${p.gender==='Male'?'badge-blue':'badge-teal'}">${p.gender}</span></td>
      <td>${p.parent||'—'}</td>
      <td style="font-size:0.8rem">${p.contact||'—'}</td>
      <td style="font-size:0.78rem;color:var(--text-3);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.notes||'None'}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="editPatient('${p.id}')">Edit</button>
        <button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="deletePatient('${p.id}')">Del</button>
      </td>
    </tr>`).join('');
}

function openPatientModal(patientId) {
  document.getElementById('patient-modal').classList.add('active');
  document.getElementById('patient-modal-title').textContent = patientId ? 'Edit Patient' : 'Add New Patient';
  ['name','age','gender','parent','contact','address','notes'].forEach(f => { const el = document.getElementById('p-'+f); if (el) el.value = ''; });
  document.getElementById('patient-modal')._editId = null;
  if (patientId) {
    const p = load(STORAGE_KEYS.patients).find(p => p.id === patientId);
    if (p) {
      document.getElementById('p-name').value = p.name||'';
      document.getElementById('p-age').value = p.age||'';
      document.getElementById('p-gender').value = p.gender||'Male';
      document.getElementById('p-parent').value = p.parent||'';
      document.getElementById('p-contact').value = p.contact||'';
      document.getElementById('p-address').value = p.address||'';
      document.getElementById('p-notes').value = p.notes||'';
      document.getElementById('patient-modal')._editId = patientId;
    }
  }
}
function closePatientModal() { document.getElementById('patient-modal').classList.remove('active'); }
function editPatient(id) { openPatientModal(id); }

function savePatient() {
  const name = document.getElementById('p-name').value.trim();
  if (!name) { showToast('Patient name is required','error'); return; }
  const patients = load(STORAGE_KEYS.patients);
  const editId = document.getElementById('patient-modal')._editId;
  if (editId) {
    const idx = patients.findIndex(p => p.id === editId);
    if (idx >= 0) {
      patients[idx] = { ...patients[idx], name, age:document.getElementById('p-age').value, gender:document.getElementById('p-gender').value, parent:document.getElementById('p-parent').value, contact:document.getElementById('p-contact').value, address:document.getElementById('p-address').value, notes:document.getElementById('p-notes').value };
      showToast('Patient updated','success');
    }
  } else {
    const newId = 'P' + String(patients.length + 1).padStart(3,'0');
    patients.push({ id:newId, name, age:document.getElementById('p-age').value, gender:document.getElementById('p-gender').value, parent:document.getElementById('p-parent').value, contact:document.getElementById('p-contact').value, address:document.getElementById('p-address').value, notes:document.getElementById('p-notes').value });
    showToast('Patient added','success');
  }
  save(STORAGE_KEYS.patients, patients);
  closePatientModal();
  renderPatientsTable();
  refreshDashboard();
}

function deletePatient(id) {
  if (!confirm('Delete this patient record?')) return;
  save(STORAGE_KEYS.patients, load(STORAGE_KEYS.patients).filter(p => p.id !== id));
  renderPatientsTable();
  refreshDashboard();
  showToast('Patient removed','error');
}

// ── APPOINTMENTS TABLE ──
function renderApptsTable() {
  const appts = load(STORAGE_KEYS.appointments);
  const search = (document.getElementById('search-appts').value||'').toLowerCase();
  const status = document.getElementById('filter-appt-status').value;
  const date = document.getElementById('filter-appt-date').value;
  const filtered = appts.filter(a =>
    (!search || a.patientName.toLowerCase().includes(search) || a.doctorName.toLowerCase().includes(search) || a.id.toLowerCase().includes(search)) &&
    (!status || a.status === status) &&
    (!date || a.date === date)
  ).sort((a,b) => b.date.localeCompare(a.date));
  const tbody = document.getElementById('appts-table-body');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-3)">No appointments found</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(a => `
    <tr>
      <td class="td-mono">${a.id}</td>
      <td class="td-name">${a.patientName}</td>
      <td>${a.doctorName}</td>
      <td>${new Date(a.date).toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'})}</td>
      <td><span class="td-mono">${a.time}</span></td>
      <td><span class="badge badge-blue" style="font-size:0.7rem">${(a.dept||'').split(' ')[0]}</span></td>
      <td>${statusBadge(a.status)}</td>
      <td style="display:flex;gap:4px;flex-wrap:wrap">
        ${a.status==='Pending'?`<button class="btn btn-success btn-sm" onclick="updateApptStatus('${a.id}','Approved')">Approve</button>`:''}
        ${a.status!=='Cancelled'&&a.status!=='Completed'?`<button class="btn btn-outline btn-sm" onclick="editAppt('${a.id}')">Edit</button>`:''}
        ${a.status!=='Cancelled'?`<button class="btn btn-danger btn-sm" onclick="cancelAppt('${a.id}')">Cancel</button>`:''}
      </td>
    </tr>`).join('');
}

function openApptModal(apptId) {
  const modal = document.getElementById('appt-modal');
  modal.classList.add('active');
  document.getElementById('appt-modal-title').textContent = apptId ? 'Edit Appointment' : 'New Appointment';
  modal._editId = null;

  const doctors = load(STORAGE_KEYS.doctors);
  const patients = load(STORAGE_KEYS.patients);
  document.getElementById('a-patient').innerHTML = patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('');
  document.getElementById('a-doctor').innerHTML = doctors.map(d => `<option value="${d.id}" data-dept="${d.dept}">${d.name}</option>`).join('');
  document.getElementById('a-date').value = fmtDate(new Date());
  document.getElementById('a-status').value = 'Pending';
  document.getElementById('a-notes').value = '';
  loadModalSlots();

  if (apptId) {
    const a = load(STORAGE_KEYS.appointments).find(a => a.id === apptId);
    if (a) {
      document.getElementById('a-patient').value = a.patientId;
      document.getElementById('a-doctor').value = a.doctorId;
      document.getElementById('a-date').value = a.date;
      document.getElementById('a-status').value = a.status;
      document.getElementById('a-notes').value = a.notes||'';
      loadModalSlots();
      setTimeout(() => { document.getElementById('a-time').value = a.time; }, 50);
      modal._editId = apptId;
    }
  }
}
function closeApptModal() { document.getElementById('appt-modal').classList.remove('active'); }
function editAppt(id) { openApptModal(id); }

function loadModalSlots() {
  const doctorId = document.getElementById('a-doctor').value;
  const date = document.getElementById('a-date').value;
  const appts = load(STORAGE_KEYS.appointments);
  const editId = document.getElementById('appt-modal')._editId;
  const bookedTimes = appts.filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'Cancelled' && a.id !== editId).map(a => a.time);
  const slots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  document.getElementById('a-time').innerHTML = slots.map(s =>
    bookedTimes.includes(s)
      ? `<option value="${s}" disabled>${s} (Booked)</option>`
      : `<option value="${s}">${s}</option>`
  ).join('');
}

function saveAppt() {
  const patientSel = document.getElementById('a-patient');
  const doctorSel = document.getElementById('a-doctor');
  const date = document.getElementById('a-date').value;
  const time = document.getElementById('a-time').value;
  if (!patientSel.value || !doctorSel.value || !date || !time) { showToast('All fields required','error'); return; }

  const appts = load(STORAGE_KEYS.appointments);
  const editId = document.getElementById('appt-modal')._editId;
  const patientName = patientSel.options[patientSel.selectedIndex].text.split(' (')[0];
  const doctorName = doctorSel.options[doctorSel.selectedIndex].text;
  const doctors = load(STORAGE_KEYS.doctors);
  const doc = doctors.find(d => d.id === doctorSel.value);

  // Overlap check
  const conflict = appts.find(a => a.doctorId === doctorSel.value && a.date === date && a.time === time && a.status !== 'Cancelled' && a.id !== editId);
  if (conflict) { showToast('Time slot already booked for this doctor!','error'); return; }

  if (editId) {
    const idx = appts.findIndex(a => a.id === editId);
    if (idx >= 0) {
      appts[idx] = { ...appts[idx], patientId:patientSel.value, patientName, doctorId:doctorSel.value, doctorName, dept:doc?.dept||'', date, time, status:document.getElementById('a-status').value, notes:document.getElementById('a-notes').value };
      showToast('Appointment updated','success');
    }
  } else {
    const newId = 'A' + String(appts.length + 1).padStart(3,'0');
    appts.push({ id:newId, patientId:patientSel.value, patientName, doctorId:doctorSel.value, doctorName, dept:doc?.dept||'', date, time, status:document.getElementById('a-status').value, notes:document.getElementById('a-notes').value });
    showToast('Appointment created','success');
  }
  save(STORAGE_KEYS.appointments, appts);
  closeApptModal();
  renderApptsTable();
  refreshDashboard();
}

function updateApptStatus(id, status) {
  const appts = load(STORAGE_KEYS.appointments);
  const idx = appts.findIndex(a => a.id === id);
  if (idx >= 0) { appts[idx].status = status; save(STORAGE_KEYS.appointments, appts); }
  renderApptsTable();
  renderDocAppts();
  refreshDashboard();
  refreshDocDashboard();
  showToast('Status updated to ' + status, 'success');
}

function cancelAppt(id) {
  if (!confirm('Cancel this appointment?')) return;
  updateApptStatus(id, 'Cancelled');
}

// ── SCHEDULE ──
function renderSchedulePanel() {
  const doctors = load(STORAGE_KEYS.doctors);
  document.getElementById('sched-doctor-select').innerHTML = '<option value="">-- Select Doctor --</option>' +
    doctors.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
  renderWeeklyGrid('schedule-weekly-grid');
  renderBlockedDates();
}

function renderDoctorSchedule() {
  const id = document.getElementById('sched-doctor-select').value;
  const editor = document.getElementById('sched-editor');
  if (!id) { editor.style.display = 'none'; return; }
  editor.style.display = 'block';
  const schedules = JSON.parse(localStorage.getItem(STORAGE_KEYS.schedules)||'{}');
  const sched = schedules[id] || {};
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const activeDays = sched.days || ['Mon','Tue','Wed','Thu','Fri'];
  document.getElementById('sched-days').innerHTML = days.map(d => `
    <label style="display:flex;align-items:center;gap:4px;font-size:0.82rem;cursor:pointer">
      <input type="checkbox" ${activeDays.includes(d)?'checked':''} value="${d}" style="accent-color:var(--blue-light)">
      ${d}
    </label>`).join('');
  if (sched.start) document.getElementById('sched-start').value = sched.start;
  if (sched.end) document.getElementById('sched-end').value = sched.end;
}

function saveSchedule() {
  const id = document.getElementById('sched-doctor-select').value;
  if (!id) return;
  const schedules = JSON.parse(localStorage.getItem(STORAGE_KEYS.schedules)||'{}');
  const days = [...document.querySelectorAll('#sched-days input:checked')].map(i => i.value);
  schedules[id] = { days, start: document.getElementById('sched-start').value, end: document.getElementById('sched-end').value, blocked: schedules[id]?.blocked || [] };
  localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));
  showToast('Schedule saved','success');
}

function addBlockedDate() {
  const id = document.getElementById('sched-doctor-select').value;
  const date = document.getElementById('sched-block-date').value;
  if (!id || !date) { showToast('Select doctor and date','error'); return; }
  const schedules = JSON.parse(localStorage.getItem(STORAGE_KEYS.schedules)||'{}');
  if (!schedules[id]) schedules[id] = { days:['Mon','Tue','Wed','Thu','Fri'], start:'09:00', end:'17:00', blocked:[] };
  if (!schedules[id].blocked) schedules[id].blocked = [];
  if (!schedules[id].blocked.includes(date)) schedules[id].blocked.push(date);
  localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));
  renderBlockedDates();
  showToast('Date blocked','success');
}

function renderBlockedDates() {
  const schedules = JSON.parse(localStorage.getItem(STORAGE_KEYS.schedules)||'{}');
  const doctors = load(STORAGE_KEYS.doctors);
  let html = '';
  Object.entries(schedules).forEach(([docId, sched]) => {
    if (sched.blocked && sched.blocked.length) {
      const doc = doctors.find(d => d.id === docId);
      if (doc) {
        html += `<div style="margin-bottom:12px"><strong style="font-size:0.85rem">${doc.name}</strong><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">`;
        sched.blocked.forEach(date => {
          html += `<span style="background:var(--danger-bg);color:var(--danger);padding:3px 10px;border-radius:100px;font-size:0.78rem;font-weight:600">
            🚫 ${new Date(date).toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'})}
            <button onclick="removeBlock('${docId}','${date}')" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:0.8rem;margin-left:4px">✕</button>
          </span>`;
        });
        html += '</div></div>';
      }
    }
  });
  document.getElementById('blocked-dates-list').innerHTML = html || '<p style="color:var(--text-3);font-size:0.85rem">No blocked dates configured.</p>';
}

function removeBlock(docId, date) {
  const schedules = JSON.parse(localStorage.getItem(STORAGE_KEYS.schedules)||'{}');
  if (schedules[docId]) schedules[docId].blocked = (schedules[docId].blocked||[]).filter(d => d !== date);
  localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));
  renderBlockedDates();
  showToast('Block removed','success');
}

function renderWeeklyGrid(targetId) {
  const appts = load(STORAGE_KEYS.appointments);
  const times = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  const weekDays = ['Mon','Tue','Wed','Thu','Fri'];
  const today = new Date();
  const dow = today.getDay();
  const weekDates = weekDays.map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1) + i);
    return fmtDate(d);
  });

  let html = `<div class="sched-header sched-cell">Time</div>`;
  weekDays.forEach((day, i) => {
    html += `<div class="sched-header sched-cell">${day}<br><small style="opacity:0.6;font-size:0.65rem">${weekDates[i].slice(5)}</small></div>`;
  });
  times.forEach(time => {
    html += `<div class="sched-time sched-cell">${time}</div>`;
    weekDays.forEach((_, i) => {
      const dayAppts = appts.filter(a => a.date === weekDates[i] && a.time === time && a.status !== 'Cancelled');
      if (dayAppts.length) {
        html += `<div class="sched-cell" style="background:var(--off)"><div class="sched-appt">${dayAppts[0].patientName.split(' ')[0]}<br><span style="font-size:0.65rem;opacity:0.7">${dayAppts[0].doctorName.split(' ')[1]||''}</span></div></div>`;
      } else {
        html += `<div class="sched-cell"></div>`;
      }
    });
  });
  document.getElementById(targetId).innerHTML = html;
}

// ── REPORTS ──
let reportCharts = {};
function renderReports() {
  const appts = load(STORAGE_KEYS.appointments);
  const patients = load(STORAGE_KEYS.patients);
  document.getElementById('rep-total').textContent = appts.length;
  document.getElementById('rep-completed').textContent = appts.filter(a=>a.status==='Completed').length;
  document.getElementById('rep-pending').textContent = appts.filter(a=>a.status==='Pending').length;
  document.getElementById('rep-new-patients').textContent = patients.length;

  // Monthly chart
  setTimeout(() => {
    ['monthly','demographics','status'].forEach(id => {
      if (reportCharts[id]) reportCharts[id].destroy();
    });

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthData = months.map((_, i) => appts.filter(a => new Date(a.date).getMonth() === i).length + Math.floor(Math.random()*3));
    const ctxM = document.getElementById('chart-monthly');
    if (ctxM) reportCharts.monthly = new Chart(ctxM, {
      type:'line',
      data: { labels:months, datasets:[{ label:'Appointments', data:monthData, borderColor:'#1976d2', backgroundColor:'rgba(25,118,210,0.08)', fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'#1976d2' }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,grid:{color:'#f0f4f8'}},x:{grid:{display:false}}} }
    });

    const ctxD = document.getElementById('chart-demographics');
    if (ctxD) reportCharts.demographics = new Chart(ctxD, {
      type:'bar',
      data: { labels:['0-2 yrs','3-5 yrs','6-10 yrs','11-15 yrs','16+ yrs'], datasets:[{label:'Patients',data:[2,3,4,2,1],backgroundColor:'#bbdefb',borderColor:'#1976d2',borderWidth:2,borderRadius:6}] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,grid:{color:'#f0f4f8'}},x:{grid:{display:false}}} }
    });

    const statusCounts = ['Approved','Pending','Completed','Cancelled'].map(s => appts.filter(a=>a.status===s).length);
    const ctxS = document.getElementById('chart-status');
    if (ctxS) reportCharts.status = new Chart(ctxS, {
      type:'doughnut',
      data: { labels:['Approved','Pending','Completed','Cancelled'], datasets:[{data:statusCounts,backgroundColor:['#bbdefb','#fff9c4','#c8e6c9','#ffcdd2'],borderWidth:0}] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right',labels:{font:{size:11},boxWidth:12}}} }
    });

    // Doctor performance
    const doctors = load(STORAGE_KEYS.doctors);
    const perfHtml = doctors.map(d => {
      const dAppts = appts.filter(a => a.doctorId === d.id);
      const completed = dAppts.filter(a => a.status==='Completed').length;
      const total = dAppts.length;
      const pct = total ? Math.round(completed/total*100) : 0;
      return `<div class="progress-row">
        <div class="progress-label">${d.name.split(' ')[1]} ${d.name.split(' ')[2]||''}</div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:${d.color}"></div></div>
        <div class="progress-val">${total}</div>
      </div>`;
    }).join('');
    document.getElementById('doctor-performance').innerHTML = perfHtml;
  }, 100);
}

function setReportPeriod(period, btn) {
  document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderReports();
}

// ── DOCTOR VIEWS ──
function renderDocAppts() {
  if (!currentUser || currentUser.role !== 'doctor') return;
  const appts = load(STORAGE_KEYS.appointments).filter(a => a.doctorId === currentUser.id);
  const search = (document.getElementById('doc-search-appts').value||'').toLowerCase();
  const status = document.getElementById('doc-filter-status').value;
  const filtered = appts.filter(a =>
    (!search || a.patientName.toLowerCase().includes(search)) &&
    (!status || a.status === status)
  ).sort((a,b) => a.date.localeCompare(b.date));
  const patients = load(STORAGE_KEYS.patients);
  const tbody = document.getElementById('doc-appts-table');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-3)">No appointments</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(a => {
    const pat = patients.find(p => p.id === a.patientId)||{};
    return `<tr>
      <td>${new Date(a.date).toLocaleDateString('en',{month:'short',day:'numeric'})}</td>
      <td><span class="td-mono">${a.time}</span></td>
      <td class="td-name">${a.patientName}</td>
      <td>${pat.age||'—'}</td>
      <td style="font-size:0.78rem;color:var(--text-3)">${(a.notes||'').substring(0,40)}${a.notes&&a.notes.length>40?'...':''}</td>
      <td>${statusBadge(a.status)}</td>
      <td style="display:flex;gap:4px;flex-wrap:wrap">
        ${a.status==='Pending'?`<button class="btn btn-success btn-sm" onclick="updateApptStatus('${a.id}','Approved')">Accept</button><button class="btn btn-danger btn-sm" onclick="updateApptStatus('${a.id}','Cancelled')">Reject</button>`:''}
        ${a.status==='Approved'?`<button class="btn btn-blue btn-sm" onclick="updateApptStatus('${a.id}','Completed')">Complete</button>`:''}
      </td>
    </tr>`;
  }).join('');
}

function renderDocPatients() {
  if (!currentUser || currentUser.role !== 'doctor') return;
  const appts = load(STORAGE_KEYS.appointments).filter(a => a.doctorId === currentUser.id);
  const patients = load(STORAGE_KEYS.patients);
  const notes = load(STORAGE_KEYS.notes);
  const search = (document.getElementById('doc-search-patients').value||'').toLowerCase();
  const myPatientIds = [...new Set(appts.map(a => a.patientId))];
  const myPatients = patients.filter(p => myPatientIds.includes(p.id) && (!search || p.name.toLowerCase().includes(search)));
  const tbody = document.getElementById('doc-patients-table');
  if (myPatients.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-3)">No patients assigned</td></tr>';
    return;
  }
  tbody.innerHTML = myPatients.map(p => {
    const lastAppt = appts.filter(a => a.patientId === p.id).sort((a,b)=>b.date.localeCompare(a.date))[0];
    const noteCount = notes.filter(n => n.patientId === p.id && n.doctorId === currentUser.id).length;
    return `<tr>
      <td class="td-name">${p.name}</td>
      <td>${p.age||'—'}</td>
      <td><span class="badge ${p.gender==='Male'?'badge-blue':'badge-teal'}">${p.gender}</span></td>
      <td>${p.parent||'—'}</td>
      <td style="font-size:0.8rem">${p.contact||'—'}</td>
      <td style="font-size:0.8rem">${lastAppt ? new Date(lastAppt.date).toLocaleDateString('en',{month:'short',day:'numeric'}) : '—'}</td>
      <td><span class="badge badge-blue">${noteCount} note${noteCount!==1?'s':''}</span></td>
    </tr>`;
  }).join('');
}

function renderDocSchedule() {
  renderWeeklyGrid('doc-schedule-grid');
}

function renderNotes() {
  const notes = load(STORAGE_KEYS.notes);
  const myNotes = currentUser.role === 'admin' ? notes : notes.filter(n => n.doctorId === currentUser.id);
  const container = document.getElementById('notes-list');
  if (myNotes.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><h3>No notes yet</h3><p>Add clinical notes after appointments</p></div>';
    return;
  }
  container.innerHTML = myNotes.map(n => `
    <div class="note-card">
      <div class="note-card-header">
        <div>
          <span class="td-name">${n.patientName}</span>
          ${n.diagnosis ? `<span class="badge badge-blue" style="margin-left:8px;font-size:0.72rem">${n.diagnosis}</span>` : ''}
        </div>
        <div style="text-align:right">
          <div class="note-card-date">${new Date(n.date).toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'})}</div>
          <div style="font-size:0.75rem;color:var(--text-4)">${n.doctorName}</div>
        </div>
      </div>
      <div class="note-card-text">${n.text}</div>
      <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
        <span class="badge ${n.status==='Resolved'?'badge-green':n.status==='Ongoing'?'badge-amber':'badge-blue'}">${n.status}</span>
        <button class="btn btn-danger btn-sm" style="margin-left:auto" onclick="deleteNote('${n.id}')">Delete</button>
      </div>
    </div>`).join('');
}

function openNoteModal() {
  const modal = document.getElementById('note-modal');
  modal.classList.add('active');
  const patients = load(STORAGE_KEYS.patients);
  const appts = currentUser.role === 'doctor' ? load(STORAGE_KEYS.appointments).filter(a => a.doctorId === currentUser.id) : load(STORAGE_KEYS.appointments);
  document.getElementById('note-patient').innerHTML = patients.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
  document.getElementById('note-appt').innerHTML = '<option value="">None (standalone note)</option>' + appts.map(a=>`<option value="${a.id}">${a.date} - ${a.patientName}</option>`).join('');
  ['note-diagnosis','note-text'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('note-status').value = 'Ongoing';
}
function closeNoteModal() { document.getElementById('note-modal').classList.remove('active'); }

function saveNote() {
  const text = document.getElementById('note-text').value.trim();
  const patientSel = document.getElementById('note-patient');
  if (!text || !patientSel.value) { showToast('Patient and note text required','error'); return; }
  const notes = load(STORAGE_KEYS.notes);
  const newId = 'N' + String(notes.length + 1).padStart(3,'0');
  const patients = load(STORAGE_KEYS.patients);
  const pat = patients.find(p => p.id === patientSel.value)||{};
  notes.push({
    id: newId,
    patientId: patientSel.value,
    patientName: pat.name || '',
    doctorId: currentUser.id,
    doctorName: currentUser.name,
    date: fmtDate(new Date()),
    diagnosis: document.getElementById('note-diagnosis').value,
    text,
    status: document.getElementById('note-status').value
  });
  save(STORAGE_KEYS.notes, notes);
  closeNoteModal();
  renderNotes();
  refreshDocDashboard();
  showToast('Note saved','success');
}

function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  save(STORAGE_KEYS.notes, load(STORAGE_KEYS.notes).filter(n => n.id !== id));
  renderNotes();
  refreshDocDashboard();
  showToast('Note deleted','');
}

// ── STATUS BADGE ──
function statusBadge(status) {
  const map = { 'Pending':'badge-amber', 'Approved':'badge-blue', 'Completed':'badge-green', 'Cancelled':'badge-red' };
  return `<span class="badge ${map[status]||'badge-gray'}">${status}</span>`;
}

// ── PUBLIC BOOKING ──
function filterDoctors() {
  const dept = document.getElementById('b-dept').value;
  const doctors = load(STORAGE_KEYS.doctors);
  const filtered = dept ? doctors.filter(d => d.dept === dept) : doctors;
  document.getElementById('b-doctor').innerHTML = '<option value="">-- Select Doctor --</option>' +
    filtered.map(d => `<option value="${d.id}">${d.name} — ${d.dept}</option>`).join('');
}

function bookingStep2() {
  const name = document.getElementById('b-patient-name').value.trim();
  const doctorId = document.getElementById('b-doctor').value;
  if (!name || !doctorId) { showToast('Please fill patient name and select a doctor','error'); return; }
  document.getElementById('bform-step1').style.display = 'none';
  document.getElementById('bform-step2').style.display = 'block';
  document.getElementById('bstep1').classList.remove('active'); document.getElementById('bstep1').classList.add('done');
  document.getElementById('bstep2').classList.add('active');
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
  document.getElementById('b-date').value = fmtDate(tomorrow);
  const doctors = load(STORAGE_KEYS.doctors);
  const doc = doctors.find(d => d.id === doctorId);
  document.getElementById('b-doctor-display').value = doc ? doc.name : '';
  loadTimeSlots();
}

function loadTimeSlots() {
  const doctorId = document.getElementById('b-doctor').value;
  const date = document.getElementById('b-date').value;
  const appts = load(STORAGE_KEYS.appointments);
  const booked = appts.filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'Cancelled').map(a => a.time);
  const schedules = JSON.parse(localStorage.getItem(STORAGE_KEYS.schedules)||'{}');
  const sched = schedules[doctorId];
  if (sched && sched.blocked && sched.blocked.includes(date)) {
    document.getElementById('time-slots-grid').innerHTML = '<div style="color:var(--danger);font-size:0.85rem;grid-column:1/-1;padding:12px">Doctor is not available on this date.</div>';
    return;
  }
  const slots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'];
  document.getElementById('time-slots-grid').innerHTML = slots.map(s => {
    const taken = booked.includes(s);
    return `<div class="time-slot ${taken?'taken':''}" onclick="${taken?'':''}" ${!taken?`onclick="selectSlot(this,'${s}')"`:''}">${s}${taken?' (Booked)':''}</div>`;
  }).join('');
  window._selectedSlot = null;
}

function selectSlot(el, time) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  window._selectedSlot = time;
}

function bookingBackStep1() {
  document.getElementById('bform-step2').style.display = 'none';
  document.getElementById('bform-step1').style.display = 'block';
  document.getElementById('bstep2').classList.remove('active');
  document.getElementById('bstep1').classList.remove('done');
  document.getElementById('bstep1').classList.add('active');
}

function bookingStep3() {
  const date = document.getElementById('b-date').value;
  const slot = window._selectedSlot;
  if (!date || !slot) { showToast('Please select a date and time slot','error'); return; }
  document.getElementById('bform-step2').style.display = 'none';
  document.getElementById('bform-step3').style.display = 'block';
  document.getElementById('bstep2').classList.remove('active'); document.getElementById('bstep2').classList.add('done');
  document.getElementById('bstep3').classList.add('active');

  const doctors = load(STORAGE_KEYS.doctors);
  const docId = document.getElementById('b-doctor').value;
  const doc = doctors.find(d => d.id === docId)||{};
  document.getElementById('booking-summary').innerHTML = `
    <div class="appt-summary-row"><span>Patient Name</span><span>${document.getElementById('b-patient-name').value}</span></div>
    <div class="appt-summary-row"><span>Parent / Guardian</span><span>${document.getElementById('b-parent-name').value||'—'}</span></div>
    <div class="appt-summary-row"><span>Doctor</span><span>${doc.name}</span></div>
    <div class="appt-summary-row"><span>Department</span><span>${doc.dept}</span></div>
    <div class="appt-summary-row"><span>Date</span><span>${new Date(date).toLocaleDateString('en',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</span></div>
    <div class="appt-summary-row"><span>Time</span><span>${slot}</span></div>
    <div class="appt-summary-row"><span>Contact</span><span>${document.getElementById('b-contact').value||'—'}</span></div>
  `;
}

function bookingBackStep2() {
  document.getElementById('bform-step3').style.display = 'none';
  document.getElementById('bform-step2').style.display = 'block';
  document.getElementById('bstep3').classList.remove('active');
  document.getElementById('bstep2').classList.remove('done');
  document.getElementById('bstep2').classList.add('active');
}

function confirmBooking() {
  const docId = document.getElementById('b-doctor').value;
  const date = document.getElementById('b-date').value;
  const time = window._selectedSlot;
  const doctors = load(STORAGE_KEYS.doctors);
  const doc = doctors.find(d => d.id === docId)||{};
  const patients = load(STORAGE_KEYS.patients);
  const appts = load(STORAGE_KEYS.appointments);

  // Check overlap
  const conflict = appts.find(a => a.doctorId === docId && a.date === date && a.time === time && a.status !== 'Cancelled');
  if (conflict) { showToast('This slot was just booked. Please select another.','error'); return; }

  // Auto-create patient record
  let patientId;
  const pName = document.getElementById('b-patient-name').value.trim();
  let existingPat = patients.find(p => p.name.toLowerCase() === pName.toLowerCase());
  if (existingPat) {
    patientId = existingPat.id;
  } else {
    patientId = 'P' + String(patients.length + 1).padStart(3,'0');
    patients.push({ id:patientId, name:pName, age:document.getElementById('b-age').value, gender:'—', parent:document.getElementById('b-parent-name').value, contact:document.getElementById('b-contact').value, address:'', notes:document.getElementById('b-reason').value });
    save(STORAGE_KEYS.patients, patients);
  }

  const newId = 'A' + String(appts.length + 1).padStart(3,'0');
  appts.push({ id:newId, patientId, patientName:pName, doctorId:docId, doctorName:doc.name, dept:doc.dept||'', date, time, status:'Pending', notes:document.getElementById('b-reason').value });
  save(STORAGE_KEYS.appointments, appts);

  const ref = 'KC-' + String(Date.now()).slice(-6);
  document.getElementById('booking-ref').textContent = ref;
  document.getElementById('booking-form-area').style.display = 'none';
  document.getElementById('booking-success-area').style.display = 'block';
}

function resetBooking() {
  document.getElementById('booking-form-area').style.display = 'block';
  document.getElementById('booking-success-area').style.display = 'none';
  document.getElementById('bform-step1').style.display = 'block';
  document.getElementById('bform-step2').style.display = 'none';
  document.getElementById('bform-step3').style.display = 'none';
  ['bstep1','bstep2','bstep3'].forEach(id => { const el=document.getElementById(id); el.classList.remove('active','done'); });
  document.getElementById('bstep1').classList.add('active');
  filterDoctors();
}

// ── TOAST ──
let toastTimer;
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = '';
  if (type) t.classList.add(type);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── INIT ──
initData();
showSection('home');
filterDoctors();

// Date
setInterval(updateTopbarDate, 60000);

// Init booking doctor list
filterDoctors();

// Make sure home is visible
document.getElementById('sec-about').style.display = 'none';
document.getElementById('sec-services').style.display = 'none';
document.getElementById('sec-doctors').style.display = 'none';
document.getElementById('sec-contact').style.display = 'none';
document.getElementById('sec-booking').style.display = 'none';
document.getElementById('sec-home').style.display = 'block';
