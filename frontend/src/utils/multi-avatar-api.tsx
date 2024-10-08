const get_image_from_api = (email: string) => {
  return `https://api.multiavatar.com/${email}.com.svg`;
};

export default get_image_from_api;
