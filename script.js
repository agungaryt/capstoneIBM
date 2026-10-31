/* ============================================================
   DATA QUALITY & CLEANSING MANAGEMENT HUB — SCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   1. RAW DATASET — 100 Customer Records
      Intentional issues: null values, duplicate rows, bad emails
   ============================================================ */
const RAW_DATASET = [
  { id:1,  name:"Alice Johnson",    email:"alice.johnson@email.com",    phone:"081234567890", city:"Jakarta",   age:28, signup:"2024-01-05" },
  { id:2,  name:"Bob Martinez",     email:"bob.martinez@email.com",     phone:"081234567891", city:"Surabaya",  age:34, signup:"2024-01-08" },
  { id:3,  name:"Clara Dewi",       email:"clara.dewi@email",           phone:"081234567892", city:"Bandung",   age:25, signup:"2024-01-10" },
  { id:4,  name:"David Lee",        email:null,                         phone:"081234567893", city:"Medan",     age:40, signup:"2024-01-12" },
  { id:5,  name:"Eva Putri",        email:"eva.putri@email.com",        phone:null,           city:"Semarang",  age:31, signup:"2024-01-15" },
  { id:6,  name:"Frank Wijaya",     email:"frankwijaya_email.com",      phone:"081234567895", city:"Yogyakarta",age:22, signup:"2024-01-18" },
  { id:7,  name:"Grace Santoso",    email:"grace.santoso@email.com",    phone:"081234567896", city:"Bali",      age:29, signup:"2024-01-20" },
  { id:8,  name:"Hendra Pratama",   email:"hendra@email.com",           phone:"081234567897", city:null,        age:35, signup:"2024-01-22" },
  { id:9,  name:"Irma Sari",        email:"irma.sari@email.com",        phone:"081234567898", city:"Makassar",  age:27, signup:"2024-01-25" },
  { id:10, name:"John Tanjung",     email:"john.tanjung@email.com",     phone:"081234567899", city:"Palembang", age:null,signup:"2024-01-28" },
  { id:11, name:"Karen Halim",      email:"karen.halim@email.com",      phone:"081234560001", city:"Jakarta",   age:33, signup:"2024-02-01" },
  { id:12, name:"Liam Nugroho",     email:"liam.nugroho@",              phone:"081234560002", city:"Surabaya",  age:26, signup:"2024-02-03" },
  { id:13, name:"Maya Puspita",     email:"maya.puspita@email.com",     phone:null,           city:"Bandung",   age:30, signup:"2024-02-05" },
  { id:14, name:"Nathan Kurniawan", email:null,                         phone:"081234560004", city:"Medan",     age:38, signup:"2024-02-08" },
  { id:15, name:"Olivia Setiawan",  email:"olivia.setiawan@email.com",  phone:"081234560005", city:"Semarang",  age:24, signup:"2024-02-10" },
  { id:16, name:"Peter Gunawan",    email:"peter_gunawan@email",        phone:"081234560006", city:"Yogyakarta",age:45, signup:"2024-02-12" },
  { id:17, name:"Qiana Hartono",    email:"qiana.hartono@email.com",    phone:"081234560007", city:"Bali",      age:28, signup:"2024-02-15" },
  { id:18, name:"Rudi Susanto",     email:"rudi.susanto@email.com",     phone:"081234560008", city:null,        age:36, signup:"2024-02-18" },
  { id:19, name:"Sinta Wahyu",      email:"sinta.wahyu@email.com",      phone:"081234560009", city:"Makassar",  age:29, signup:"2024-02-20" },
  { id:20, name:"Tommy Irawan",     email:"tommy.irawan@email.com",     phone:"081234560010", city:"Palembang", age:null,signup:"2024-02-22" },
  { id:21, name:"Ulia Rahmawati",   email:"ulia.rahmawati@email.com",   phone:"081234560011", city:"Jakarta",   age:32, signup:"2024-03-01" },
  { id:22, name:"Victor Budiman",   email:"victor_budiman.com",         phone:"081234560012", city:"Surabaya",  age:27, signup:"2024-03-03" },
  { id:23, name:"Winda Anggraini",  email:null,                         phone:"081234560013", city:"Bandung",   age:25, signup:"2024-03-05" },
  { id:24, name:"Xander Saputra",   email:"xander.saputra@email.com",   phone:"081234560014", city:"Medan",     age:41, signup:"2024-03-08" },
  { id:25, name:"Yuni Lestari",     email:"yuni.lestari@email.com",     phone:null,           city:"Semarang",  age:30, signup:"2024-03-10" },
  { id:26, name:"Zara Permata",     email:"zarapermata@email.com",      phone:"081234560016", city:"Yogyakarta",age:23, signup:"2024-03-12" },
  { id:27, name:"Adi Kusuma",       email:"adi.kusuma@email.com",       phone:"081234560017", city:"Bali",      age:37, signup:"2024-03-15" },
  { id:28, name:"Bella Oktavia",    email:"bella.oktavia@email.com",    phone:"081234560018", city:null,        age:26, signup:"2024-03-18" },
  { id:29, name:"Candra Putra",     email:"candra_putra@email",         phone:"081234560019", city:"Makassar",  age:34, signup:"2024-03-20" },
  { id:30, name:"Dian Ayu",         email:"dian.ayu@email.com",         phone:"081234560020", city:"Palembang", age:null,signup:"2024-03-22" },
  { id:31, name:"Eko Widodo",       email:"eko.widodo@email.com",       phone:"081234560021", city:"Jakarta",   age:39, signup:"2024-04-01" },
  { id:32, name:"Fitri Handayani",  email:null,                         phone:"081234560022", city:"Surabaya",  age:28, signup:"2024-04-03" },
  { id:33, name:"Gilang Ramadhan",  email:"gilang.ramadhan@email.com",  phone:null,           city:"Bandung",   age:25, signup:"2024-04-05" },
  { id:34, name:"Hana Kusumawati",  email:"hana.kusumawati@email.com",  phone:"081234560024", city:"Medan",     age:31, signup:"2024-04-08" },
  { id:35, name:"Indra Baskara",    email:"indra_baskara.com",          phone:"081234560025", city:"Semarang",  age:43, signup:"2024-04-10" },
  { id:36, name:"Julia Amelia",     email:"julia.amelia@email.com",     phone:"081234560026", city:"Yogyakarta",age:27, signup:"2024-04-12" },
  { id:37, name:"Kevin Pratama",    email:"kevin.pratama@email.com",    phone:"081234560027", city:"Bali",      age:29, signup:"2024-04-15" },
  { id:38, name:"Luna Cahyani",     email:"luna.cahyani@email.com",     phone:"081234560028", city:null,        age:24, signup:"2024-04-18" },
  { id:39, name:"Miko Setiadi",     email:null,                         phone:"081234560029", city:"Makassar",  age:35, signup:"2024-04-20" },
  { id:40, name:"Nina Rahayu",      email:"nina.rahayu@email.com",      phone:"081234560030", city:"Palembang", age:null,signup:"2024-04-22" },
  // --- DUPLICATES ---
  { id:41, name:"Alice Johnson",    email:"alice.johnson@email.com",    phone:"081234567890", city:"Jakarta",   age:28, signup:"2024-01-05" }, // dup of 1
  { id:42, name:"Bob Martinez",     email:"bob.martinez@email.com",     phone:"081234567891", city:"Surabaya",  age:34, signup:"2024-01-08" }, // dup of 2
  { id:43, name:"Grace Santoso",    email:"grace.santoso@email.com",    phone:"081234567896", city:"Bali",      age:29, signup:"2024-01-20" }, // dup of 7
  { id:44, name:"Irma Sari",        email:"irma.sari@email.com",        phone:"081234567898", city:"Makassar",  age:27, signup:"2024-01-25" }, // dup of 9
  { id:45, name:"Olivia Setiawan",  email:"olivia.setiawan@email.com",  phone:"081234560005", city:"Semarang",  age:24, signup:"2024-02-10" }, // dup of 15
  // --- CONTINUE ---
  { id:46, name:"Omar Abdullah",    email:"omar.abdullah@email.com",    phone:"081234560036", city:"Jakarta",   age:33, signup:"2024-05-01" },
  { id:47, name:"Prita Natasha",    email:"prita.natasha@email.com",    phone:"081234560037", city:"Surabaya",  age:26, signup:"2024-05-03" },
  { id:48, name:"Qori Fadillah",    email:"qori_fadillah@email",        phone:"081234560038", city:"Bandung",   age:30, signup:"2024-05-05" },
  { id:49, name:"Rangga Firmansyah",email:null,                         phone:"081234560039", city:"Medan",     age:38, signup:"2024-05-08" },
  { id:50, name:"Sari Budianti",    email:"sari.budianti@email.com",    phone:null,           city:"Semarang",  age:24, signup:"2024-05-10" },
  { id:51, name:"Taufik Hidayat",   email:"taufik.hidayat@email.com",   phone:"081234560041", city:"Yogyakarta",age:45, signup:"2024-05-12" },
  { id:52, name:"Umi Kalsum",       email:"umi.kalsum@email.com",       phone:"081234560042", city:"Bali",      age:28, signup:"2024-05-15" },
  { id:53, name:"Vanny Agustin",    email:"vanny.agustin@email.com",    phone:"081234560043", city:null,        age:36, signup:"2024-05-18" },
  { id:54, name:"Wahyu Nugroho",    email:"wahyunugroho.com",           phone:"081234560044", city:"Makassar",  age:29, signup:"2024-05-20" },
  { id:55, name:"Xenia Kusuma",     email:"xenia.kusuma@email.com",     phone:"081234560045", city:"Palembang", age:null,signup:"2024-05-22" },
  { id:56, name:"Yanuar Pradana",   email:"yanuar.pradana@email.com",   phone:"081234560046", city:"Jakarta",   age:32, signup:"2024-06-01" },
  { id:57, name:"Zahra Aulia",      email:null,                         phone:"081234560047", city:"Surabaya",  age:27, signup:"2024-06-03" },
  { id:58, name:"Andi Wibowo",      email:"andi.wibowo@email.com",      phone:"081234560048", city:"Bandung",   age:25, signup:"2024-06-05" },
  { id:59, name:"Budi Santoso",     email:"budi.santoso@email.com",     phone:null,           city:"Medan",     age:41, signup:"2024-06-08" },
  { id:60, name:"Cici Pertiwi",     email:"cici_pertiwi@email",         phone:"081234560050", city:"Semarang",  age:30, signup:"2024-06-10" },
  // --- MORE DUPLICATES ---
  { id:61, name:"Yanuar Pradana",   email:"yanuar.pradana@email.com",   phone:"081234560046", city:"Jakarta",   age:32, signup:"2024-06-01" }, // dup of 56
  { id:62, name:"Taufik Hidayat",   email:"taufik.hidayat@email.com",   phone:"081234560041", city:"Yogyakarta",age:45, signup:"2024-05-12" }, // dup of 51
  // --- CONTINUE ---
  { id:63, name:"Dodi Firmansyah",  email:"dodi.firmansyah@email.com",  phone:"081234560053", city:"Yogyakarta",age:37, signup:"2024-06-12" },
  { id:64, name:"Elsa Maharani",    email:"elsa.maharani@email.com",    phone:"081234560054", city:"Bali",      age:26, signup:"2024-06-15" },
  { id:65, name:"Fajar Maulana",    email:null,                         phone:"081234560055", city:"Makassar",  age:34, signup:"2024-06-18" },
  { id:66, name:"Gita Savitri",     email:"gita.savitri@email.com",     phone:"081234560056", city:"Palembang", age:null,signup:"2024-06-20" },
  { id:67, name:"Hafiz Rahman",     email:"hafiz.rahman@email.com",     phone:"081234560057", city:"Jakarta",   age:39, signup:"2024-07-01" },
  { id:68, name:"Intan Permata",    email:"intanpermata_email.com",     phone:null,           city:"Surabaya",  age:28, signup:"2024-07-03" },
  { id:69, name:"Joko Widodo",      email:"joko.widodo@email.com",      phone:"081234560059", city:"Bandung",   age:25, signup:"2024-07-05" },
  { id:70, name:"Kirana Anindita",  email:"kirana.anindita@email.com",  phone:"081234560060", city:"Medan",     age:31, signup:"2024-07-08" },
  { id:71, name:"Lukman Hakim",     email:"lukman.hakim@email.com",     phone:"081234560061", city:"Semarang",  age:43, signup:"2024-07-10" },
  { id:72, name:"Mira Susanti",     email:null,                         phone:"081234560062", city:"Yogyakarta",age:27, signup:"2024-07-12" },
  { id:73, name:"Nino Ardiyanto",   email:"nino.ardiyanto@email.com",   phone:"081234560063", city:"Bali",      age:29, signup:"2024-07-15" },
  { id:74, name:"Okta Wulandari",   email:"okta.wulandari@email.com",   phone:"081234560064", city:null,        age:24, signup:"2024-07-18" },
  { id:75, name:"Panji Kusuma",     email:"panji_kusuma.net",           phone:"081234560065", city:"Makassar",  age:35, signup:"2024-07-20" },
  { id:76, name:"Queenna Rianti",   email:"queenna.rianti@email.com",   phone:"081234560066", city:"Palembang", age:null,signup:"2024-07-22" },
  { id:77, name:"Rahma Yulianti",   email:"rahma.yulianti@email.com",   phone:"081234560067", city:"Jakarta",   age:33, signup:"2024-08-01" },
  { id:78, name:"Satria Bagas",     email:"satria.bagas@email.com",     phone:null,           city:"Surabaya",  age:26, signup:"2024-08-03" },
  { id:79, name:"Tiara Nuraini",    email:"tiara.nuraini@email.com",    phone:"081234560069", city:"Bandung",   age:30, signup:"2024-08-05" },
  { id:80, name:"Ucok Manurung",    email:"ucok@manurung@email.com",    phone:"081234560070", city:"Medan",     age:38, signup:"2024-08-08" },
  // --- MORE DUPLICATES ---
  { id:81, name:"Rahma Yulianti",   email:"rahma.yulianti@email.com",   phone:"081234560067", city:"Jakarta",   age:33, signup:"2024-08-01" }, // dup of 77
  // --- CONTINUE ---
  { id:82, name:"Vira Pertiwi",     email:"vira.pertiwi@email.com",     phone:"081234560072", city:"Semarang",  age:24, signup:"2024-08-10" },
  { id:83, name:"Wahid Saefudin",   email:null,                         phone:"081234560073", city:"Yogyakarta",age:45, signup:"2024-08-12" },
  { id:84, name:"Xena Lorensa",     email:"xena.lorensa@email.com",     phone:"081234560074", city:"Bali",      age:28, signup:"2024-08-15" },
  { id:85, name:"Yogi Prasetyo",    email:"yogi.prasetyo@email.com",    phone:"081234560075", city:null,        age:36, signup:"2024-08-18" },
  { id:86, name:"Zulfa Mardiana",   email:"zulfamardiana_email",        phone:"081234560076", city:"Makassar",  age:29, signup:"2024-08-20" },
  { id:87, name:"Arif Budiman",     email:"arif.budiman@email.com",     phone:"081234560077", city:"Palembang", age:null,signup:"2024-08-22" },
  { id:88, name:"Bayu Saputra",     email:"bayu.saputra@email.com",     phone:"081234560078", city:"Jakarta",   age:32, signup:"2024-09-01" },
  { id:89, name:"Cinta Dewi",       email:"cinta.dewi@email.com",       phone:null,           city:"Surabaya",  age:27, signup:"2024-09-03" },
  { id:90, name:"Dani Wicaksono",   email:"dani.wicaksono@email.com",   phone:"081234560080", city:"Bandung",   age:25, signup:"2024-09-05" },
  { id:91, name:"Eka Mahardika",    email:"eka@mahardika@email.com",    phone:"081234560081", city:"Medan",     age:41, signup:"2024-09-08" },
  { id:92, name:"Fani Wulansari",   email:"fani.wulansari@email.com",   phone:"081234560082", city:"Semarang",  age:30, signup:"2024-09-10" },
  { id:93, name:"Ganda Prasetya",   email:null,                         phone:"081234560083", city:"Yogyakarta",age:37, signup:"2024-09-12" },
  { id:94, name:"Hesti Rahayu",     email:"hesti.rahayu@email.com",     phone:"081234560084", city:"Bali",      age:26, signup:"2024-09-15" },
  // --- DUPLICATE ---
  { id:95, name:"Bayu Saputra",     email:"bayu.saputra@email.com",     phone:"081234560078", city:"Jakarta",   age:32, signup:"2024-09-01" }, // dup of 88
  // --- CONTINUE ---
  { id:96, name:"Irawan Santoso",   email:"irawan.santoso@email.com",   phone:"081234560086", city:"Makassar",  age:34, signup:"2024-09-18" },
  { id:97, name:"Jihan Fadila",     email:"jihan.fadila@email.com",     phone:null,           city:"Palembang", age:null,signup:"2024-09-20" },
  { id:98, name:"Kami Pratiwi",     email:"kami_pratiwi.info",          phone:"081234560088", city:"Jakarta",   age:39, signup:"2024-09-22" },
  { id:99, name:"Lani Kusumadewi",  email:"lani.kusumadewi@email.com",  phone:"081234560089", city:"Surabaya",  age:28, signup:"2024-09-25" },
  { id:100,name:"Manda Safitri",    email:"manda.safitri@email.com",    phone:"081234560090", city:"Bandung",   age:25, signup:"2024-09-28" },
];

/* ============================================================
   2. HELPERS
   ============================================================ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(e) { return e && EMAIL_RE.test(e); }

function classifyRow(row, allRows) {
  // Check duplicate: same name + email as a previous row (lower id)
  const isDuplicate = allRows.some(r =>
    r.id !== row.id &&
    r.id < row.id &&
    r.name === row.name &&
    r.email === row.email &&
    r.phone === row.phone
  );
  const hasNull   = row.name === null || row.email === null || row.phone === null ||
                    row.city === null || row.age === null;
  const badEmail  = row.email !== null && !isValidEmail(row.email);

  if (isDuplicate) return 'duplicate';
  if (hasNull || badEmail) return 'error';
  return 'valid';
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

/* ============================================================
   3. STATE
   ============================================================ */
let dataset       = deepClone(RAW_DATASET);
let currentFilter = 'all';
let currentSearch = '';
let currentPage   = 1;
// PAGE_SIZE is dynamic — overridden by Settings modal
function getPageSize() { return window._pageSizeOverride || 15; }

let doughnutChart = null;
let barChart      = null;
let lineChart     = null;

/* ============================================================
   4. ANALYTICS — compute KPI values
   ============================================================ */
function computeStats(rows) {
  const total      = rows.length;
  let nullCount    = 0;
  let badEmail     = 0;
  let validCount   = 0;
  let dupCount     = 0;

  // Column-level missing counts
  const colMissing = { name:0, email:0, phone:0, city:0, age:0 };
  const colBadEmail = 0;

  rows.forEach(row => {
    if (row.name   === null) colMissing.name++;
    if (row.email  === null) colMissing.email++;
    if (row.phone  === null) colMissing.phone++;
    if (row.city   === null) colMissing.city++;
    if (row.age    === null) colMissing.age++;

    const hasNull  = Object.values({ n:row.name, e:row.email, p:row.phone, c:row.city, a:row.age }).some(v => v === null);
    const bEmail   = row.email !== null && !isValidEmail(row.email);
    if (hasNull) nullCount++;
    if (bEmail)  badEmail++;
  });

  rows.forEach(row => {
    const cls = classifyRow(row, rows);
    if (cls === 'duplicate') dupCount++;
    if (cls === 'valid')     validCount++;
  });

  const totalMissing = Object.values(colMissing).reduce((a,b)=>a+b,0);
  const healthScore  = total ? Math.round((validCount / total) * 100) : 0;

  return { total, validCount, dupCount, totalMissing, healthScore, colMissing, badEmail };
}

/* ============================================================
   5. RENDER KPI CARDS
   ============================================================ */
function renderKPI(stats) {
  document.getElementById('kpiTotal').textContent     = stats.total.toLocaleString();
  document.getElementById('kpiHealth').textContent    = stats.healthScore + '%';
  document.getElementById('healthBar').style.width    = stats.healthScore + '%';
  document.getElementById('kpiMissing').textContent   = stats.totalMissing.toLocaleString();
  document.getElementById('kpiDuplicates').textContent= stats.dupCount.toLocaleString();

  const missingPct = stats.total ? ((stats.totalMissing / (stats.total * 5)) * 100).toFixed(1) : 0;
  const dupPct     = stats.total ? ((stats.dupCount / stats.total) * 100).toFixed(1) : 0;
  document.getElementById('kpiMissingPct').textContent = missingPct + '% of total cells';
  document.getElementById('kpiDupPct').textContent     = dupPct + '% of total records';

  // Dynamic color on health bar
  const bar = document.getElementById('healthBar');
  if (stats.healthScore >= 80) {
    bar.style.background = 'linear-gradient(90deg,#10b981,#059669)';
  } else if (stats.healthScore >= 50) {
    bar.style.background = 'linear-gradient(90deg,#f59e0b,#d97706)';
  } else {
    bar.style.background = 'linear-gradient(90deg,#f43f5e,#e11d48)';
  }

  // Doughnut center
  document.getElementById('doughnutCenter').innerHTML =
    `<span class="dc-pct">${stats.healthScore}%</span><span class="dc-label">Valid</span>`;
}

/* ============================================================
   6. CHARTS
   ============================================================ */
function initCharts(stats) {
  buildDoughnut(stats);
  buildBar(stats);
  buildLine();
}

function buildDoughnut(stats) {
  const ctx = document.getElementById('doughnutChart').getContext('2d');
  const errorCount = stats.total - stats.validCount - stats.dupCount;

  if (doughnutChart) doughnutChart.destroy();
  doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Valid', 'Duplicates', 'Errors / Missing'],
      datasets: [{
        data: [stats.validCount, stats.dupCount, Math.max(0, errorCount)],
        backgroundColor: ['#10b981', '#f59e0b', '#f43f5e'],
        borderWidth: 0,
        hoverOffset: 6,
      }]
    },
    options: {
      cutout: '72%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 11 }, boxWidth: 10, padding: 12 }
        },
        tooltip: {
          callbacks: {
            label(ctx) {
              const v = ctx.raw;
              const pct = stats.total ? ((v / stats.total) * 100).toFixed(1) : 0;
              return ` ${v} rows (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

function buildBar(stats) {
  const ctx = document.getElementById('barChart').getContext('2d');
  const cm  = stats.colMissing;

  // Per-column: missing + bad email counted on email column
  const emailErrors = stats.badEmail + (cm.email || 0);
  const labels = ['Name', 'Email', 'Phone', 'City', 'Age'];
  const missing = [cm.name, cm.email, cm.phone, cm.city, cm.age];
  const badEm   = [0, stats.badEmail, 0, 0, 0];

  if (barChart) barChart.destroy();
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label:'Missing (null)', data: missing, backgroundColor:'#f43f5e', borderRadius:4 },
        { label:'Bad Format',     data: badEm,   backgroundColor:'#f59e0b', borderRadius:4 },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position:'bottom', labels:{ font:{size:11}, boxWidth:10 } },
        tooltip: { mode:'index', intersect: false }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { stacked: true, beginAtZero: true, ticks: { precision:0, font:{ size:11 } },
             grid: { color:'#f1f5f9' } }
      }
    }
  });
}

function buildLine() {
  const ctx = document.getElementById('lineChart').getContext('2d');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'];
  // Simulated ingestion / cleaning trend per month
  const ingested = [12, 9, 11, 8, 10, 9, 9, 10, 8];
  const cleaned  = [8,  6,  8,  6,  7,  7,  7,  8,  6];
  const errors   = ingested.map((v,i) => v - cleaned[i]);

  if (lineChart) lineChart.destroy();
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Records Ingested',
          data: ingested,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,.08)',
          tension: .4, fill: true, pointRadius: 4,
          pointBackgroundColor: '#4f46e5', borderWidth: 2,
        },
        {
          label: 'Records Cleaned',
          data: cleaned,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.06)',
          tension: .4, fill: true, pointRadius: 4,
          pointBackgroundColor: '#10b981', borderWidth: 2,
        },
        {
          label: 'Error Records',
          data: errors,
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244,63,94,.06)',
          tension: .4, fill: true, pointRadius: 4,
          pointBackgroundColor: '#f43f5e', borderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position:'bottom', labels:{ font:{size:11}, boxWidth:10 } },
        tooltip: { mode:'index', intersect: false }
      },
      scales: {
        x: { grid:{ display:false }, ticks:{ font:{ size:11 } } },
        y: { beginAtZero:true, ticks:{ precision:0, font:{ size:11 } }, grid:{ color:'#f1f5f9' } }
      }
    }
  });
}

function refreshCharts(stats) {
  buildDoughnut(stats);
  buildBar(stats);
}

/* ============================================================
   7. TABLE RENDERING
   ============================================================ */
function getFilteredRows() {
  let rows = dataset.map(row => ({ ...row, _status: classifyRow(row, dataset) }));

  if (currentFilter !== 'all') {
    rows = rows.filter(r => r._status === currentFilter);
  }

  if (currentSearch.trim()) {
    const q = currentSearch.trim().toLowerCase();
    rows = rows.filter(r =>
      (r.name  && r.name.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.city  && r.city.toLowerCase().includes(q))
    );
  }
  return rows;
}

function cellVal(val, type) {
  if (val === null || val === undefined) {
    return `<span class="cell-null">—null—</span>`;
  }
  if (type === 'email') {
    if (!isValidEmail(val)) return `<span class="cell-error-email" title="Invalid email format">${val}</span>`;
    if (val.includes('_filled_')) return `<span class="cell-filled">${val.replace('_filled_','')}</span>`;
  }
  return String(val);
}

function statusBadge(status) {
  const map = {
    valid:     '<span class="badge badge-valid">✓ Valid</span>',
    error:     '<span class="badge badge-error">✗ Error</span>',
    duplicate: '<span class="badge badge-duplicate">⊘ Duplicate</span>',
  };
  return map[status] || '';
}

function renderTable() {
  const rows    = getFilteredRows();
  const total   = rows.length;
  const ps      = getPageSize();
  const pages   = Math.max(1, Math.ceil(total / ps));
  currentPage   = Math.min(currentPage, pages);

  const slice = rows.slice((currentPage - 1) * ps, currentPage * ps);

  const tbody = document.getElementById('tableBody');
  if (slice.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8">No records match your filter or search.</td></tr>`;
  } else {
    // Respect highlight-rows setting
    const highlight = window._highlightRows !== false;
    tbody.innerHTML = slice.map((row, idx) => {
      const cls = highlight
        ? (row._status === 'duplicate' ? 'row-duplicate' : row._status === 'error' ? 'row-error' : '')
        : '';
      const num = (currentPage - 1) * ps + idx + 1;
      return `<tr class="${cls}">
        <td>${num}</td>
        <td>${cellVal(row.name)}</td>
        <td>${cellVal(row.email, 'email')}</td>
        <td>${cellVal(row.phone)}</td>
        <td>${cellVal(row.city)}</td>
        <td>${cellVal(row.age)}</td>
        <td>${cellVal(row.signup)}</td>
        <td>${statusBadge(row._status)}</td>
      </tr>`;
    }).join('');
  }

  // Info
  document.getElementById('tableInfo').textContent =
    `Showing ${slice.length} of ${total} record${total !== 1 ? 's' : ''}`;

  // Pagination
  renderPagination(pages);
}

function renderPagination(pages) {
  const pag = document.getElementById('pagination');
  if (pages <= 1) { pag.innerHTML = ''; return; }

  let html = '';
  html += `<button class="page-btn" onclick="goPage(${currentPage-1})" ${currentPage===1?'disabled':''}>‹</button>`;

  const range = pagRange(currentPage, pages);
  range.forEach(p => {
    if (p === '…') {
      html += `<button class="page-btn" disabled>…</button>`;
    } else {
      html += `<button class="page-btn ${p===currentPage?'active':''}" onclick="goPage(${p})">${p}</button>`;
    }
  });

  html += `<button class="page-btn" onclick="goPage(${currentPage+1})" ${currentPage===pages?'disabled':''}>›</button>`;
  pag.innerHTML = html;
}

function pagRange(cur, max) {
  if (max <= 7) return Array.from({length:max}, (_,i)=>i+1);
  if (cur <= 4) return [1,2,3,4,5,'…',max];
  if (cur >= max-3) return [1,'…',max-4,max-3,max-2,max-1,max];
  return [1,'…',cur-1,cur,cur+1,'…',max];
}

window.goPage = function(p) {
  currentPage = p;
  renderTable();
};

/* ============================================================
   8. CLEAN ACTIONS
   ============================================================ */
function cleanDuplicates() {
  const seen = new Set();
  const before = dataset.length;
  dataset = dataset.filter(row => {
    const key = `${row.name}||${row.email}||${row.phone}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const removed = before - dataset.length;
  updateAll();
  showToast(`Removed ${removed} duplicate row${removed !== 1 ? 's' : ''}`, 'success');
}

function fixMissingValues() {
  let fixed = 0;
  dataset = dataset.map(row => {
    const r = { ...row };
    if (r.name  === null) { r.name  = 'Unknown Name';       fixed++; }
    if (r.email === null) { r.email = `user${r.id}@datahub.internal`; fixed++; }
    if (r.phone === null) { r.phone = '+62-000-0000-000';   fixed++; }
    if (r.city  === null) { r.city  = 'Unknown City';       fixed++; }
    if (r.age   === null) { r.age   = 0;                    fixed++; }
    return r;
  });
  updateAll();
  showToast(`Filled ${fixed} missing value${fixed !== 1 ? 's' : ''} with defaults`, 'warning');
}

function resetData() {
  dataset = deepClone(RAW_DATASET);
  currentPage = 1;
  updateAll();
  showToast('Dataset reset to original state', 'info');
}

/* ============================================================
   9. EXPORT
   ============================================================ */
function exportCSV() {
  const cols  = ['id','name','email','phone','city','age','signup'];
  const lines = [cols.join(',')];
  dataset.forEach(row => {
    lines.push(cols.map(c => {
      const v = row[c];
      if (v === null || v === undefined) return '';
      const s = String(v);
      return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g,'""')}"` : s;
    }).join(','));
  });
  downloadFile(lines.join('\n'), 'cleaned_data.csv', 'text/csv;charset=utf-8;');
  showToast('CSV exported successfully', 'success');
}

function exportJSON() {
  const json = JSON.stringify(dataset, null, 2);
  downloadFile(json, 'cleaned_data.json', 'application/json');
  showToast('JSON exported successfully', 'success');
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   10. TOAST NOTIFICATIONS
   ============================================================ */
let toastDuration = 3000; // configurable via Settings modal

function showToast(message, type = 'info') {
  const icons = { success:'✓', warning:'⚠', info:'ℹ', error:'✕' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type]||'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut .25s ease forwards';
    setTimeout(() => toast.remove(), 250);
  }, toastDuration);
}

/* ============================================================
   11. UPDATE ALL (KPI + Charts + Table)
   ============================================================ */
let autoSyncTimestamp = true; // configurable via Settings

function updateAll() {
  const stats = computeStats(dataset);
  renderKPI(stats);
  refreshCharts(stats);
  renderTable();
  if (autoSyncTimestamp) {
    const now = new Date();
    document.getElementById('lastUpdated').textContent =
      `Last sync: ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
  }
}

/* ============================================================
   12. MODAL SYSTEM
   ============================================================ */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = false;
  // trap focus on close button
  const firstBtn = el.querySelector('button');
  if (firstBtn) firstBtn.focus();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
}

/* ============================================================
   13. SIDEBAR NAVIGATION
   ============================================================ */
function initSidebarNav() {
  document.querySelectorAll('.nav-item[data-nav]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = link.dataset.modal;

      // Update active state
      document.querySelectorAll('.nav-item[data-nav]').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (modalId) {
        // Open panel modal (Rules Engine, Settings)
        openModal(modalId);
      } else {
        // Smooth scroll to section
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        // Revert active to Dashboard after scroll if no modal
        // (active will stay on the scrolled nav item — that's correct UX)
      }
    });
  });

  // Also update active nav item based on scroll position
  const sections = [
    { id: 'section-dashboard',     nav: 'dashboard' },
    { id: 'section-analytics',     nav: 'analytics' },
    { id: 'section-data-explorer', nav: 'data-explorer' },
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const navKey = sections.find(s => s.id === entry.target.id);
        if (navKey) {
          document.querySelectorAll('.nav-item[data-nav]').forEach(l => l.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-item[data-nav="${navKey.nav}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });
}

/* ============================================================
   14. EVENT LISTENERS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  const stats = computeStats(dataset);
  renderKPI(stats);
  initCharts(stats);
  renderTable();

  // Sidebar navigation
  initSidebarNav();

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentPage   = 1;
      renderTable();
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  let searchTimer;
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      currentSearch = e.target.value;
      currentPage   = 1;
      renderTable();
    }, 250);
  });

  // Action buttons
  document.getElementById('btnCleanDuplicates').addEventListener('click', cleanDuplicates);
  document.getElementById('btnFixMissing').addEventListener('click', fixMissingValues);
  document.getElementById('btnResetData').addEventListener('click', resetData);

  // Export buttons
  document.getElementById('btnExportCSV').addEventListener('click', exportCSV);
  document.getElementById('btnExportJSON').addEventListener('click', exportJSON);

  // ---- Modal close: data-close-modal buttons & backdrop click ----
  document.addEventListener('click', e => {
    // Close via [data-close-modal] attribute
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }
    // Close via backdrop click (clicking the semi-transparent overlay itself)
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.hidden = true;
    }
  });

  // Escape key closes any open modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop:not([hidden])').forEach(m => {
        m.hidden = true;
        // Revert active nav away from modal items back to a scroll-based item
        document.querySelectorAll('.nav-item[data-nav]').forEach(l => l.classList.remove('active'));
        const dash = document.querySelector('.nav-item[data-nav="dashboard"]');
        if (dash) dash.classList.add('active');
      });
    }
  });

  // ---- Settings modal: Save button ----
  const btnSaveSettings = document.getElementById('btnSaveSettings');
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      // Page size
      const ps = parseInt(document.getElementById('settingPageSize').value, 10);
      if (!isNaN(ps) && ps > 0) {
        // PAGE_SIZE is a const — we use a dynamic override via a module-level var
        window._pageSizeOverride = ps;
        currentPage = 1;
      }

      // Highlight toggle
      const highlight = document.getElementById('settingHighlight').checked;
      document.querySelectorAll('.row-duplicate, .row-error').forEach(tr => {
        tr.style.background = highlight ? '' : '';
      });
      // Store preference and re-render rows
      window._highlightRows = highlight;
      renderTable();

      // Timestamp
      autoSyncTimestamp = document.getElementById('settingTimestamp').checked;

      // Toast duration
      const dur = parseInt(document.getElementById('settingToastDuration').value, 10);
      if (!isNaN(dur)) toastDuration = dur;

      closeModal('modalSettings');
      showToast('Settings saved successfully', 'success');
    });
  }
});
