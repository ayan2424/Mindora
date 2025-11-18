(function(global){
  var storeKey = 'mindora:enrollments';
  function read(){ try{ return JSON.parse(localStorage.getItem(storeKey)||'[]'); }catch(e){ return []; } }
  function write(v){ try{ localStorage.setItem(storeKey, JSON.stringify(v||[])); }catch(e){} }
  function ensureUser(){ return (global.Accounts && global.Accounts.current) || { id: 'guest' }; }
  function list(){ return Promise.resolve(read()); }
  function enroll(courseId){ var u=ensureUser(); var list=read(); if (!list.some(function(x){ return x.courseId===courseId; })) { list.push({ courseId: courseId, userId: u.id, completedLessons: [] }); write(list); } return Promise.resolve(true); }
  function updateProgress(courseId, idx){ var list=read(); list.forEach(function(x){ if (x.courseId===courseId){ if (x.completedLessons.indexOf(idx)===-1) x.completedLessons.push(idx); } }); write(list); return Promise.resolve(true); }
  if (!global.Accounts) global.Accounts = {};
  global.Accounts.listEnrollments = list;
  global.Accounts.enroll = enroll;
  global.Accounts.updateProgress = updateProgress;
})(window);
