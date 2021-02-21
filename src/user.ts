import { User } from "./type.js";

const user:User = { score: 0, lines: 0, level : 0};

export const userProxy = new Proxy(user, {
    get : function(obj:User, prop:keyof User) {
        return obj[prop]
    },
    set : function(obj:User, prop:keyof User, value) {
        obj[prop] = value;
        const span = document.getElementById(prop);
        if(span){
            span.innerHTML = JSON.stringify(obj[prop]);
        }
        return true;
    }
}) 