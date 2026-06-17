Deepti ❀ Aashirwad - Digital Wedding Invitation
=================================================

Folder mein 4 cheezein hain:
  index.html        -> main page
  app.js            -> React code (already compiled, koi build step nahi)
  vendor/           -> React + ReactDOM (offline bundled, CDN pe depend nahi karta)
  README.txt        -> yeh file

Yeh fully OFFLINE-CAPABLE hai - React/JS kahin se download nahi hota,
sab kuch isi folder mein hai. Sirf Hindi fonts (Yatra One / Eczar / Hind)
Google Fonts se load hoti hain - agar internet na ho to bhi page sahi se
khulega, bas fonts thoda generic dikhengi.

SEEDHA KHOLNE KE LIYE:
  index.html par double-click karein - kisi bhi browser (Chrome/Edge/
  Firefox) mein khul jayega.

LINK BANANE KE LIYE (taaki WhatsApp/SMS par bhej sakein):

1) Netlify Drop (sabse aasan, 2 minute)
   - https://app.netlify.com/drop kholen
   - is "wedding-invite" poore folder ko seedha us page par drag-drop
     kar dein
   - turant live link mil jayega, jaise: random-name-123.netlify.app

2) Vercel
   - https://vercel.com par free account banayein
   - "Add New Project" -> folder upload -> Deploy

3) GitHub Pages
   - is folder ko GitHub repo mein upload karein
   - Settings -> Pages -> branch enable karein
   - link format: https://username.github.io/repo-name

IMPORTANT: jab bhi upload karein, poora folder (saare 4 items, vendor
folder ke saath) ek saath upload karna hai - sirf index.html nahi,
warna React/app.js load nahi hoga aur page khaali dikhega.

FEATURES:
- "निमंत्रण खोलें" button -> gate khulta hai, marigold petals girti hain
- Background mein hamesha halki petals girti rehti hain
- Live countdown "शुभ विवाह तक" (29 June 2026 tak khud chalta rahega)
- Scroll karte hi har section fade-up hota hai
- "दिशा निर्देश पाएं" button -> Google Maps khol deta hai
- Phone number tap karne se seedha call lagta hai

DETAILS BADALNI HON TO:
  index.html ke andar saara Hindi text seedha dikh jata hai (naam,
  date, venue, address) - usi ko edit kar dein, code chhoone ki
  zaroorat nahi.
