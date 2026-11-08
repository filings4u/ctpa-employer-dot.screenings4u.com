(()=>{'use strict';
const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(d){const rows=(d.physicals||[]).map(r=>{
 const pass=r.donor_pass;
 return '<tr><td><strong>'+esc(r.reference_number)+'</strong></td><td>'+esc(r.donor_name)+'</td><td>'+esc(r.physical_type==='NON_DOT'?'Non-DOT Physical':'DOT Physical')+'<small>'+esc(r.exam_type.replaceAll('_',' '))+'</small></td><td>'+esc(r.status)+'</td><td>'+esc(pass?.pass_number||'—')+'</td><td>'+(pass?.status==='issued'?'<button type="button" class="btn primary compact" data-oh-download="'+esc(r.id)+'">Download Donor Pass</button>':'Waiting for your C/TPA')+'</td></tr>';
}).join('');
 return '<section class="hero"><small>SCREENINGS4U OCCUPATIONAL HEALTH</small><h1>Occupational Health</h1><p>Physical examinations and donor passes delivered by your C/TPA.</p></section><section class="panel section"><div class="panel-head"><div><h2>My Physicals</h2><p>Securely view your employees’ released DOT and Non-DOT Physical donor passes.</p></div></div><div class="table-wrap"><table><thead><tr><th>Order</th><th>Employee</th><th>Physical</th><th>Status</th><th>Pass</th><th>Actions</th></tr></thead><tbody>'+(rows||'<tr><td colspan="6"><div class="empty">No occupational-health donor passes have been delivered to your account.</div></td></tr>')+'</tbody></table></div></section>';
}
function printPass(x){
 const p=x.donor_pass;if(!p)return;
 const w=window.open('','_blank','noopener,noreferrer');if(!w){window.S4UDialog?.alert?.('Allow popups to open the donor pass.');return;}
 const html='<!doctype html><html><head><title>screenings4u Physical Donor Pass</title><style>body{font:16px Arial,sans-serif;color:#102f55;max-width:700px;margin:30px auto;padding:20px}.brand{background:#102f55;color:white;padding:25px;font-size:26px;font-weight:bold}h1{color:#ed6b20}td{padding:12px;border-bottom:1px solid #ddd}table{width:100%;border-collapse:collapse}@media print{button{display:none}}</style></head><body><div class="brand">screenings4u</div><h1>Occupational Health Donor Pass</h1><table><tr><td>Pass Number</td><td>'+esc(p.pass_number)+'</td></tr><tr><td>Employee</td><td>'+esc(x.donor_name)+'</td></tr><tr><td>Physical</td><td>'+esc(x.physical_type)+'</td></tr><tr><td>Collection Site</td><td>'+esc(p.collection_site_name||'To be assigned')+'</td></tr><tr><td>Site Address</td><td>'+esc(p.collection_site_address||'')+'</td></tr><tr><td>Confirmation</td><td>'+esc(p.confirmation_code||'')+'</td></tr></table><p>'+esc(p.instructions||'Present this donor pass with valid government ID.')+'</p><button onclick="window.print()">Print / Save as PDF</button></body></html>';
 w.document.open();w.document.write(html);w.document.close();
}
function bind(d){document.querySelectorAll('[data-oh-download]').forEach(b=>b.onclick=()=>{const r=(d.physicals||[]).find(x=>x.id===b.dataset.ohDownload);if(r)printPass(r)})}
window.EmployerOccupationalHealth={render,bind};
})();