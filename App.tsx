
import React, { useState } from "react";

const initialBooks = [
  { title: "Küçük Prens", author: "Antoine de Saint-Exupéry", status: "Okuyorum", progress: 75, cover: "KÜÇÜK\nPRENS", color: "#d9c5a0" },
  { title: "İnsan Olmak", author: "Engin Geçtan", status: "Okunacak", progress: 0, cover: "İNSAN\nOLMAK", color: "#b9c6b4" },
  { title: "Martı", author: "Richard Bach", status: "Okundu", progress: 100, cover: "MARTI", color: "#c5b9cf" },
];

const initialPosts = [
  { id: 1, name: "Elif Yılmaz", letter: "E", time: "18 dakika önce · Kitap notu", text: "Bazı kitaplar bize yeni bir şey öğretmekten çok, zaten bildiğimiz ama adını koyamadığımız duyguları hatırlatıyor. Bugün bu satırların üzerinde biraz durdum.", book: "İnsan Olmak", author: "Engin Geçtan", progress: 48, likes: 12, comments: 3 },
  { id: 2, name: "Merve Kaya", letter: "M", time: "1 saat önce · Yeni kitaba başladı", text: "Uzun zamandır ertelediğim kitaba bugün başladım. İlk sayfalarından itibaren çok dingin bir dünyaya davet ediyor. Akşam okumak için sabırsızlanıyorum.", book: "Küçük Prens", author: "Antoine de Saint-Exupéry", progress: 0, likes: 8, comments: 1 },
  { id: 3, name: "Ayşe Demir", letter: "A", time: "Dün · Okuma değerlendirmesi", text: "Bitti. Bir süre etkisinden çıkamayacağım gibi hissediyorum. Özellikle karakterlerin kendi iç sesleri üzerine düşündüm. 4,5 / 5 ★", book: "Martı", author: "Richard Bach", progress: 100, likes: 21, comments: 5 },
];

const friends = ["Elif", "Merve", "Ayşe", "Deniz"];

export default function App() {
  const [tab, setTab] = useState("Akış");
  const [books, setBooks] = useState(initialBooks);
  const [posts, setPosts] = useState(initialPosts);
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [page, setPage] = useState(72);
  const [newPost, setNewPost] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPages, setBookPages] = useState("");
  const [bookStatus, setBookStatus] = useState("Okunacak");
  const [randomBook, setRandomBook] = useState("");

  const addBook = () => {
    if (!bookTitle.trim()) return;
    setBooks([...books, {
      title: bookTitle,
      author: bookAuthor || "Yazar belirtilmedi",
      status: bookStatus,
      progress: 0,
      cover: bookTitle.toUpperCase(),
      color: "#d8cbb8"
    }]);
    setBookTitle("");
    setBookAuthor("");
    setBookPages("");
    setShowAdd(false);
  };

  const sharePost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), name: "Rukiye", letter: "R", time: "Şimdi · Düşünce", text: newPost, book: "", author: "", progress: 0, likes: 0, comments: 0 }, ...posts]);
    setNewPost("");
  };

  const toggle = (id: number, list: number[], setter: (v: number[]) => void) => {
    setter(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
  };

  const styles = `
    * { box-sizing: border-box; }
    body { margin: 0; background: #f7f6f1; color: #353d35; font-family: Inter, Arial, sans-serif; }
    button, input, textarea, select { font: inherit; }
    button { cursor: pointer; }
    .app { max-width: 1440px; margin: auto; padding: 0 34px 50px; }
    .top { height: 76px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #e9e7df; }
    .logo { font-family: Georgia,serif; font-size:27px; letter-spacing:-1.5px; color:#536b58; }
    .logo span { color:#b49a77; }
    .topnav { display:flex; gap:30px; }
    .topnav button { border:0; background:none; color:#777e75; padding:27px 4px; font-size:14px; }
    .topnav button.active { color:#526b56; border-bottom:2px solid #718773; }
    .profile { display:flex; align-items:center; gap:10px; font-size:14px; }
    .avatar { width:38px; height:38px; display:grid; place-items:center; border-radius:50%; background:#dce3d7; color:#526b56; font-weight:600; }
    .layout { display:grid; grid-template-columns:220px minmax(0,1fr) 245px; gap:28px; padding-top:30px; }
    .side { padding-top:6px; }
    .side button { width:100%; text-align:left; padding:13px 14px; border:0; background:transparent; color:#73796f; border-radius:9px; margin-bottom:5px; font-size:14px; }
    .side button.active { background:#e8ede5; color:#526b56; font-weight:600; }
    .side h4 { font-size:11px; letter-spacing:1.5px; color:#a0a297; text-transform:uppercase; margin:32px 12px 15px; }
    .friend { display:flex; align-items:center; gap:10px; margin:13px 8px; font-size:13px; color:#626b60; }
    .friend .avatar { width:31px; height:31px; font-size:12px; }
    .main { min-width:0; }
    .welcome { margin:5px 0 25px; }
    .welcome h1 { font-family:Georgia,serif; font-weight:400; font-size:31px; margin:0 0 7px; }
    .welcome p { color:#909389; font-size:14px; margin:0; }
    .composer, .post, .panel { background:#fff; border:1px solid #eeece5; border-radius:13px; padding:20px; margin-bottom:17px; }
    .compose-head { display:flex; gap:12px; align-items:center; }
    .compose-head input { border:0; outline:0; background:#f7f7f3; border-radius:8px; padding:14px; flex:1; min-width:0; }
    .compose-actions { display:flex; flex-wrap:wrap; gap:9px; margin:15px 0 0 50px; }
    .soft-btn { border:0; border-radius:7px; padding:9px 12px; color:#687668; background:#f0f3ed; font-size:12px; }
    .primary { border:0; border-radius:7px; background:#637b65; color:white; padding:10px 18px; font-size:13px; }
    .send { display:flex; justify-content:flex-end; margin-top:12px; }
    .post-head { display:flex; align-items:center; gap:11px; }
    .post-name { font-size:13px; font-weight:600; }
    .post-time { color:#a0a197; font-size:11px; margin-top:4px; }
    .dots { margin-left:auto; border:0; background:none; color:#9a9b91; font-size:21px; }
    .post-text { color:#62685e; font-size:14px; line-height:1.8; margin:19px 0; }
    .book-row { display:flex; align-items:center; gap:15px; background:#f8f7f2; padding:13px; border-radius:9px; }
    .cover { width:65px; height:94px; border-radius:3px; display:grid; place-items:center; text-align:center; padding:7px; white-space:pre-line; font-family:Georgia,serif; font-size:12px; color:#51564c; line-height:1.4; box-shadow:2px 3px 6px #0001; }
    .book-info strong { display:block; font-family:Georgia,serif; font-size:16px; font-weight:400; margin-bottom:5px; }
    .book-info small { color:#92948a; font-size:12px; }
    .progress { height:5px; background:#e7e9e2; border-radius:9px; overflow:hidden; margin-top:12px; }
    .progress span { display:block; height:100%; background:#849985; border-radius:9px; }
    .progress-label { color:#8d9388; font-size:11px; margin-top:6px; }
    .post-actions { display:flex; gap:20px; padding-top:16px; color:#82877c; font-size:12px; }
    .post-actions button { border:0; background:none; color:inherit; padding:0; }
    .post-actions button.selected { color:#8c6b63; }
    .comment { border-top:1px solid #f0efe9; padding-top:12px; margin-top:13px; font-size:12px; color:#85897f; }
    .right h3 { font-family:Georgia,serif; font-size:18px; font-weight:400; margin:5px 0 16px; }
    .goal { background:#e9eee6; border-radius:12px; padding:19px; margin-bottom:18px; }
    .goal-number { font-family:Georgia,serif; font-size:34px; color:#536b58; }
    .muted { font-size:12px; color:#858b80; line-height:1.7; }
    .quote { font-family:Georgia,serif; font-size:17px; line-height:1.6; color:#687767; background:#f0eee7; border-radius:11px; padding:19px; }
    .section-title { font-family:Georgia,serif; font-size:27px; font-weight:400; margin:5px 0 20px; }
    .stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:23px; }
    .stat { background:#fff; border:1px solid #eeece5; border-radius:10px; padding:18px; }
    .stat strong { display:block; font-family:Georgia,serif; font-size:26px; color:#637b65; font-weight:400; }
    .stat small { color:#96988e; font-size:12px; }
    .book-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:15px; }
    .book-card { background:#fff; border:1px solid #eeece5; border-radius:11px; padding:16px; min-width:0; }
    .book-card .cover { width:100%; height:150px; margin-bottom:14px; font-size:17px; }
    .book-card strong { font-family:Georgia,serif; font-size:15px; font-weight:400; display:block; margin-bottom:5px; }
    .book-card small { color:#92948a; font-size:11px; }
    .tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
    .tabs button { border:1px solid #e8e7df; background:#fff; border-radius:20px; padding:8px 14px; color:#85897f; font-size:12px; }
    .tabs button.active { background:#e8ede5; color:#526b56; border-color:#e8ede5; }
    .form { display:grid; gap:12px; }
    .form input,.form select { border:1px solid #e8e7df; border-radius:8px; padding:12px; width:100%; background:white; }
    .form label { font-size:12px; color:#777e75; }
    .form button { justify-self:start; }
    @media(max-width:1000px) { .layout { grid-template-columns:190px minmax(0,1fr); } .right { display:none; } }
    @media(max-width:680px) { .app { padding:0 15px 30px; } .top { height:auto; padding:16px 0; flex-wrap:wrap; gap:15px; } .topnav { order:3; width:100%; justify-content:space-between; gap:5px; } .topnav button { padding:10px 2px; font-size:12px; } .layout { display:block; padding-top:20px; } .side { display:none; } .welcome h1 { font-size:26px; } .book-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .stats { gap:7px; } .stat { padding:12px; } .stat strong { font-size:22px; } .composer,.post,.panel { padding:14px; } .compose-actions { margin-left:0; } }
  `;

  const nav = ["Akış", "Duvarım", "Kitaplığım"];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="top">
          <div className="logo">reading space<span>.</span></div>
          <nav className="topnav">
            {nav.map(n => <button key={n} className={tab === n ? "active" : ""} onClick={() => setTab(n)}>{n}</button>)}
          </nav>
          <div className="profile"><div className="avatar">R</div><span>Rukiye</span></div>
        </header>

        <div className="layout">
          <aside className="side">
            <div className="profile" style={{margin:"0 10px 25px"}}><div className="avatar">R</div><strong>Rukiye</strong></div>
            {nav.map((n,i) => <button key={n} className={tab===n?"active":""} onClick={()=>setTab(n)}>{["⌂","♡","▤"][i]}　{["Ana akış","Kişisel duvarım","Kitaplığım"][i]}</button>)}
            <h4>Arkadaşlarım</h4>
            {friends.map((f,i)=><div className="friend" key={f}><div className="avatar">{f[0]}</div>{f}</div>)}
          </aside>

          <main className="main">
            {tab === "Akış" && <>
              <div className="welcome"><h1>Merhaba, Rukiye.</h1><p>Arkadaşlarının okuma yolculuğu.</p></div>
              <section className="composer">
                <div className="compose-head"><div className="avatar">R</div><input value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Bir düşünce bırak..." /></div>
                <div className="compose-actions"><button className="soft-btn">＋ Fotoğraf</button><button className="soft-btn">“” Alıntı ekle</button><button className="soft-btn">▤ Kitap paylaş</button></div>
                <div className="send"><button className="primary" onClick={sharePost}>Paylaş</button></div>
              </section>
              {posts.map(p=><article className="post" key={p.id}>
                <div className="post-head"><div className="avatar">{p.letter}</div><div><div className="post-name">{p.name}</div><div className="post-time">{p.time}</div></div><button className="dots">···</button></div>
                <p className="post-text">{p.text}</p>
                {p.book && <div className="book-row"><div className="cover" style={{background:"#d8cbb8"}}>{p.book}</div><div className="book-info"><strong>{p.book}</strong><small>{p.author}</small>{p.progress>0 && <><div className="progress"><span style={{width:p.progress+"%"}}/></div><div className="progress-label">%{p.progress} tamamlandı</div></>}</div></div>}
                <div className="post-actions"><button className={liked.includes(p.id)?"selected":""} onClick={()=>toggle(p.id,liked,setLiked)}>♡ Beğen {p.likes+(liked.includes(p.id)?1:0)}</button><button>◯ Yorum yap {p.comments}</button><button className={saved.includes(p.id)?"selected":""} onClick={()=>toggle(p.id,saved,setSaved)}>♧ {saved.includes(p.id)?"Kaydedildi":"Kaydet"}</button></div>
                <div className="comment">Güzel bir düşünce paylaşmak için yorum yapabilirsin.</div>
              </article>)}
            </>}

            {tab === "Duvarım" && <>
              <h1 className="section-title">Rukiye'nin okuma duvarı</h1>
              <div className="stats"><div className="stat"><strong>4</strong><small>Okunan kitap</small></div><div className="stat"><strong>7</strong><small>Not</small></div><div className="stat"><strong>12</strong><small>Arkadaş</small></div></div>
              <section className="panel"><h3>Şu an okuyorum</h3><div className="book-row"><div className="cover" style={{background:"#d9c5a0"}}>KÜÇÜK PRENS</div><div className="book-info"><strong>Küçük Prens</strong><small>Antoine de Saint-Exupéry</small><div className="progress"><span style={{width:(page/96*100)+"%"}}/></div><div className="progress-label">{page} / 96 sayfa · %{Math.round(page/96*100)} tamamlandı</div></div></div><p className="muted">Okuduğun son sayfayı güncelle</p><div style={{display:"flex",gap:8}}><input type="number" value={page} min="0" max="96" onChange={e=>setPage(Math.min(96,Math.max(0,Number(e.target.value))))} style={{width:100,padding:10,border:"1px solid #e8e7df",borderRadius:7}}/><button className="primary">Güncelle</button></div></section>
              <section className="panel"><h3>Notlarım & düşüncelerim</h3><div className="quote">“İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir.”<p className="muted">Küçük Prens · 21. sayfa</p></div><p className="muted">Bu cümle üzerine daha sonra yeniden düşünmek istiyorum.</p><div className="quote" style={{marginTop:15}}>Bugün sadece on sayfa okuyabildim. Ama bazen azı da bir başlangıçtır.<p className="muted">Okuma günlüğü · 12 Kasım</p></div></section>
            </>}

            {tab === "Kitaplığım" && <>
              <h1 className="section-title">Kitaplığım</h1>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><p className="muted">Kendi rafını oluştur</p><button className="primary" onClick={()=>setShowAdd(!showAdd)}>＋ Kitap ekle</button></div>
              {showAdd && <section className="panel form"><h3>Kitaplığına yeni bir kitap ekle</h3><label>Kitap adı<input value={bookTitle} onChange={e=>setBookTitle(e.target.value)} placeholder="Örn. Kendine Ait Bir Oda"/></label><label>Yazar<input value={bookAuthor} onChange={e=>setBookAuthor(e.target.value)} placeholder="Yazarın adı"/></label><label>Toplam sayfa<input type="number" value={bookPages} onChange={e=>setBookPages(e.target.value)} placeholder="Örn. 240"/></label><label>Kitap durumu<select value={bookStatus} onChange={e=>setBookStatus(e.target.value)}><option>Okuyorum</option><option>Okunacak</option><option>Okundu</option></select></label><div style={{display:"flex",gap:10}}><button className="soft-btn" onClick={()=>setShowAdd(false)}>Vazgeç</button><button className="primary" onClick={addBook}>Kitabı ekle</button></div></section>}
              <div className="tabs">{["Tümü","Okuyorum","Okunacak","Okundu"].map(x=><button key={x} onClick={()=>setBookStatus(x)} className={bookStatus===x?"active":""}>{x}</button>)}</div>
              <div className="book-grid">{books.filter(b=>bookStatus==="Tümü"||b.status===bookStatus).map((b,i)=><div className="book-card" key={i}><div className="cover" style={{background:b.color}}>{b.cover}</div><strong>{b.title}</strong><small>{b.author}</small><div className="progress"><span style={{width:b.progress+"%"}}/></div><div className="progress-label">{b.status}</div></div>)}</div>
              <section className="panel" style={{marginTop:22}}><h3>Şimdi ne okusam?</h3><p className="muted">Okunacaklar rafından rastgele bir kitap seç.</p><div className="quote" style={{textAlign:"center",marginBottom:14}}> {randomBook || "Sıradaki kitabını şansına bırak."}</div><button className="primary" onClick={()=>{const choices=books.filter(b=>b.status==="Okunacak");setRandomBook(choices.length?choices[Math.floor(Math.random()*choices.length)].title:"Önce okunacaklar rafına kitap ekle.");}}>Çarkı çevir</button></section>
            </>}
          </main>

          <aside className="right">
            <section className="goal"><h3>Okuma hedefim</h3><div className="goal-number">4 / 12</div><p className="muted">2026 yılında tamamlanan kitaplar</p><div className="progress"><span style={{width:"33%"}}/></div></section>
            <h3>Bu ayki niyetin</h3><p className="muted">4 / 12 kitap</p>
            <h3 style={{marginTop:30}}>Şu sıralar raflarda</h3>
            {initialBooks.map((b,i)=><div className="friend" key={b.title}><div className="cover" style={{background:b.color,width:35,height:48,fontSize:7}}>{b.cover}</div><div><strong style={{fontSize:12}}>{b.title}</strong><div className="muted">{["Elif · %48","Merve · Yeni başladı","Ayşe · Bitirdi"][i]}</div></div></div>)}
            <div className="quote" style={{marginTop:25}}>“Bugün birkaç sayfa yeter.”<div className="muted" style={{marginTop:8}}>Haftanın küçük hatırlatması</div></div>
          </aside>
        </div>
      </div>
    </>
  );
}
