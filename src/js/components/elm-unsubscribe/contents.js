export default class CContents {
  constructor(parent) {
    this._parent = parent
  };

  getNoparams() {
    return `${`
<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-slash-circle display-1 text-danger'></i>
    <h1 class='mt-3'>Chybějící parametr</h1>
    <p class='lead'>Omlouváme se, ale v URL chybí požadovaný parametr. Zkontrolujte adresu a zkuste to znovu.</p>
  </div>
</div>
    `}`
  };

  getNocandidate() {
    return `${`
<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-exclamation-triangle display-1 text-warning'></i>
    <h1 class='mt-3'>Kandidát nenalezen</h1>
    <p class='lead'>Omlouváme se, ale kandidáta, kterého hledáte, neexistuje nebo byl odstraněn.</p>
  </div>
</div>
    `}`
  };

  getRemoveCandidate(candidate) {
    return `${`
<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-person-dash display-1 text-success'></i>
    <h1 class='mt-3'>Úspěšné odhlášení</h1>
    <p class='lead'>Odběr pro <strong>${candidate.email}</strong> byl úspěšně zrušen. Nebudete již dostávat další zprávy.</p>
  </div>
</div>
    `}`
  }
}