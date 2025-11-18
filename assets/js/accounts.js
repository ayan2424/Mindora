(function(global){
  var storeKey = 'mindora:account';
  function read(){ try{ return JSON.parse(localStorage.getItem(storeKey)||'null'); }catch(e){ return null; } }
  function write(obj){ try{ localStorage.setItem(storeKey, JSON.stringify(obj||null)); }catch(e){} }
  function delay(v){ return new Promise(function(res){ setTimeout(function(){ res(v); }, 150); }); }
  var activity = [];
  function recordActivity(type, data){ activity.push({ type:type, data:data||{}, ts: Date.now() }); }
  function getCurrentUser(){ return delay(read()); }
  function updateProfile(p){ var u = read()||{}; u.name=p.name; u.email=p.email; u.avatar=p.avatar; write(u); recordActivity('profile_update',{}); return delay(u); }
  function listActivity(n){ return delay(activity.slice(-Math.max(1,n||20))); }
  function listEnrollments(){ return delay([]); }
  function logout(){ write(null); recordActivity('logout',{}); return delay(true); }
  global.Accounts = { init:function(){}, current: read(), getCurrentUser:getCurrentUser, updateProfile:updateProfile, listActivity:listActivity, listEnrollments:listEnrollments, logout:logout, recordActivity:recordActivity };
})(window);
