import Bg1 from "assets/img/Bg1.png";
import Bg2 from "assets/img/Bg2.png";
import Bg3 from "assets/img/Bg3.png";
import Bg4 from "assets/img/Bg4.png";
import Bg5 from "assets/img/Bg5.png";
import Bg6 from "assets/img/Bg6.png";
import Bg7 from "assets/img/Bg7.png";
import Bg8 from "assets/img/Bg8.png";

export const BACKEND_URL = "https://giftcardsapidev.azurewebsites.net/api/";
export const GET_IP_URL = "https://api.ipify.org?format=json";

export const cards = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8];

let s1 = '[*|"":<>[]{}`\\(),';
let s2 = "';«@&-+%$°!#=?¡¿¨:≠~`^¬._";
let s3 = '"£∞§¶•ªº]';
let s4 = "';«&-+%$°!#=?¡¿¨:≠~`^¬";
let s5 = "';«&-+%$°#=¨_≠~`^¬@";
let s6 = '[*|""<>[]{}`\\()';

export const filterStringName = s1 + s2 + s3;
export const filterStringEmail = s1 + s4 + s3;
export const filterStringMessage = s3 + s5 + s6;

// email and name = [*|\"":<>[\]{}`\\()';«@&-+%$°!#=?¡¿¨:≠~`\^¬"£∞§¶•ªº]
// message = [*|\"":<>[\]{}`\\()';«&-+%$°#=¨_≠~`\^¬"£∞§¶•ªº]
