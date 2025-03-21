
// Vanilla JavaScript version of the Footer component

const Footer = () => {
  const footer = document.createElement('footer');
  footer.className = "py-6 border-t border-white/10 backdrop-blur-md bg-black/30";
  
  const container = document.createElement('div');
  container.className = "container mx-auto px-4 text-center";
  
  const paragraph = document.createElement('p');
  paragraph.className = "carti-font text-sm flex items-center justify-center text-white/80 hover-scale";
  paragraph.textContent = `CARTI CATALOG © ${new Date().getFullYear()}`;
  
  const albumRow = document.createElement('span');
  albumRow.className = "album-row ml-2 flex items-center";
  
  // Add album icons
  const albums = [
    { src: "https://cache.umusic.com/_sites/playboicarti.com/images/products/CD13-375x375-1.png", alt: "Whole Lotta Red", className: "album-icon spin mx-1" },
    { src: "https://cache.umusic.com/_sites/playboicarti.com/images/products/CD10-375x375-1.png", alt: "Die Lit", className: "album-icon mx-1" },
    { src: "https://cache.umusic.com/_sites/playboicarti.com/images/products/CD11-375x375-1.png", alt: "Self Titled", className: "album-icon mx-1" }
  ];
  
  albums.forEach(album => {
    const img = document.createElement('img');
    img.src = album.src;
    img.alt = album.alt;
    img.className = album.className;
    albumRow.appendChild(img);
  });
  
  paragraph.appendChild(albumRow);
  container.appendChild(paragraph);
  footer.appendChild(container);
  
  return footer;
};

export default Footer;
