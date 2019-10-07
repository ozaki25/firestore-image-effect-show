function loadImage({ url }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = e => reject(e);
    img.src = url;
  });
}

export function ratio({ height, width }) {
  return height < width
    ? { height: height / width, width: 1 }
    : { height: 1, width: width / height };
}

export default loadImage;
