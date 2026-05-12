// ===== GOOGLE MAPS initMap =====
// Этот код был inline в index.html. Вынесен отдельно для удобства.
// В Tilda: вставить в Настройки страницы → Ещё → Добавить HTML перед </body>
// (ДО строки с maps.googleapis.com)

const places = [
  // ШКОЛЫ
  { coords: [42.848613, 74.589261], name: 'Школа №69', distance: '60 м', category: 'school' },
  { coords: [42.848735, 74.590245], name: 'Bilikmana International Kids', distance: '110 м', category: 'school' },
  { coords: [42.846918, 74.596351], name: 'СОШ №48', distance: '550 м', category: 'school' },
  { coords: [42.850077, 74.593824], name: 'Илим (частная школа)', distance: '540 м', category: 'school' },
  { coords: [42.851310, 74.579863], name: 'Школа №25', distance: '794 м', category: 'school' },
  { coords: [42.845235, 74.582157], name: 'СОШ №47', distance: '600 м', category: 'school' },
  { coords: [42.845235, 74.582157], name: 'Сейтек STEM', distance: '1.6 км', category: 'school' },
  { coords: [42.859191, 74.585859], name: 'Bilikmana American School', distance: '1.2 км', category: 'school' },
  { coords: [42.846032, 74.599034], name: 'Школа №61', distance: '865 м', category: 'school' },
  { coords: [42.840312, 74.580709], name: 'Intellect School', distance: '1.1 км', category: 'school' },
  // ДЕТСКИЕ САДЫ
  { coords: [42.847936, 74.591556], name: 'Солнечный город', distance: '160 м', category: 'school' },
  { coords: [42.849856, 74.590977], name: 'Карамелька', distance: '219 м', category: 'school' },
  { coords: [42.847613, 74.585311], name: 'Baby Life', distance: '354 м', category: 'school' },
  { coords: [42.850673, 74.590245], name: 'Ole Preschool', distance: '291 м', category: 'school' },
  { coords: [42.851168, 74.590817], name: 'Кораблик и Ко', distance: '356 м', category: 'school' },
  { coords: [42.844681, 74.593511], name: 'ДОО №91', distance: '452 м', category: 'school' },
  { coords: [42.846756, 74.594511], name: 'Детский сад №78', distance: '422 м', category: 'school' },
  { coords: [42.846788, 74.593182], name: 'Детский сад №5', distance: '327 м', category: 'school' },
  // МЕД. УЧРЕЖДЕНИЯ
  { coords: [42.851984, 74.582864], name: 'НХЦ им. М.М. Мамакеева', distance: '686 м', category: 'med' },
  { coords: [42.845544, 74.577201], name: 'Авицена', distance: '830 м', category: 'med' },
  { coords: [42.852700, 74.582122], name: 'ЦСМ', distance: '761 м', category: 'med' },
  { coords: [42.839753, 74.607378], name: 'Городская детская больница', distance: '979 м', category: 'med' },
  { coords: [42.842034, 74.615285], name: 'Центр онкологии', distance: '1.3 км', category: 'med' },
  { coords: [42.852700, 74.582122], name: 'Больница №2', distance: '918 м', category: 'med' },
  { coords: [42.869649, 74.599452], name: 'Республиканская', distance: '1.7 км', category: 'med' },
  // ТОРГОВЫЕ ЦЕНТРЫ
  { coords: [42.855462, 74.584985], name: 'Asia Mall', distance: '893 м', category: 'mall' },
  { coords: [42.828820, 74.583830], name: 'Ала-Арча', distance: '2.2 км', category: 'mall' },
  { coords: [42.857401, 74.609653], name: 'Vefa', distance: '1.9 км', category: 'mall' },
];

const mapStyles = [
  { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5f0e8' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#d9d0c0' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ede7d9' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e0d8cc' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f8f4ed' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c8d8e8' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c4a882' }] },
];

function makeIcon(paths, size, fill, border, iconStroke) {
  const scale = 0.58;
  const iconPx = 24 * scale;
  const pad = (size - iconPx) / 2;
  const sw = (1.6 / scale).toFixed(2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${fill}" stroke="${border}" stroke-width="2.5"/>
    <g transform="translate(${pad.toFixed(1)},${pad.toFixed(1)}) scale(${scale})" fill="none" stroke="${iconStroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${paths}</g>
  </svg>`;
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(size, size),
    anchor: new google.maps.Point(size / 2, size / 2),
  };
}

const markerIcons = {
  school: (s) => makeIcon('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', s, '#F5F0E8', '#8B7355', '#5C4A2A'),
  med:    (s) => makeIcon('<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v8M8 12h8"/>', s, '#EBF2EB', '#5A7A5A', '#3D5C3D'),
  mall:   (s) => makeIcon('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>', s, '#EDE8F5', '#6B5B8B', '#4E3F6E'),
  ivory:  (s) => makeIcon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', s, '#8B7355', '#6B5B3E', '#FFFFFF'),
};

function initMap() {
  const center = { lat: 42.848045, lng: 74.589342 };

  const map = new google.maps.Map(document.getElementById('ymap'), {
    center,
    zoom: 14,
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling: 'greedy',
  });

  const zoomStyle = `
    width:36px; height:36px; border-radius:50%;
    background:white; border:1.5px solid #8B7355;
    color:#8B7355; font-size:20px; line-height:1;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.18);
    font-family:sans-serif; user-select:none;
    transition: background 0.2s;
  `;
  const zoomWrap = document.createElement('div');
  zoomWrap.style.cssText = 'display:flex; flex-direction:column; gap:6px; margin:10px;';

  const btnIn = document.createElement('button');
  btnIn.textContent = '+';
  btnIn.title = 'Приблизить';
  btnIn.style.cssText = zoomStyle;
  btnIn.addEventListener('click', () => map.setZoom(map.getZoom() + 1));
  btnIn.addEventListener('mouseenter', () => { btnIn.style.background = '#F5F0E8'; });
  btnIn.addEventListener('mouseleave', () => { btnIn.style.background = 'white'; });

  const btnOut = document.createElement('button');
  btnOut.textContent = '−';
  btnOut.title = 'Отдалить';
  btnOut.style.cssText = zoomStyle;
  btnOut.addEventListener('click', () => map.setZoom(map.getZoom() - 1));
  btnOut.addEventListener('mouseenter', () => { btnOut.style.background = '#F5F0E8'; });
  btnOut.addEventListener('mouseleave', () => { btnOut.style.background = 'white'; });

  zoomWrap.appendChild(btnIn);
  zoomWrap.appendChild(btnOut);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomWrap);

  const infoWindow = new google.maps.InfoWindow();

  const ivoryMarker = new google.maps.Marker({
    map,
    position: center,
    icon: markerIcons.ivory(44),
    title: 'IVORY',
    zIndex: 999,
  });
  ivoryMarker.addListener('click', () => {
    infoWindow.setContent('<div style="font-family:Montserrat,sans-serif;padding:4px 2px"><b>IVORY</b><br><span style="color:#8B7355">Жилой комплекс</span></div>');
    infoWindow.open(map, ivoryMarker);
  });

  const markers = places.map(place => {
    const marker = new google.maps.Marker({
      map,
      position: { lat: place.coords[0], lng: place.coords[1] },
      icon: markerIcons[place.category](38),
      title: place.name,
    });
    marker._category = place.category;
    marker.addListener('click', () => {
      infoWindow.setContent(`<div style="font-family:Montserrat,sans-serif;padding:4px 2px"><b>${place.name}</b><br><span style="color:#8B7355">${place.distance} от IVORY</span></div>`);
      infoWindow.open(map, marker);
    });
    return marker;
  });

  document.querySelectorAll('.sur__filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sur__filter').forEach(b => b.classList.remove('sur__filter--active'));
      btn.classList.add('sur__filter--active');
      const cat = btn.dataset.category;
      markers.forEach(m => {
        m.setMap(cat === 'all' || m._category === cat ? map : null);
      });
    });
  });
}

// ===== WhatsApp dropdown =====
(function() {
  var btn = document.getElementById('waBtn');
  var wrapper = btn && btn.closest('.footer__wa-wrapper');
  if (!btn || !wrapper) return;
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    wrapper.classList.toggle('open');
  });
  document.addEventListener('click', function(e) {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('open');
    }
  });
})();
