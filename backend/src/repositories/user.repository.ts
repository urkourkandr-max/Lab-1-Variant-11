import { User } from "../dtos/user.dto"

let users:User[] = []

export const userRepository = {

findAll(){
return users.filter(u=>!u.deleted)
},

findById(id:number){
return users.find(u=>u.id===id && !u.deleted)
},

create(user:User){
users.push(user)
return user
},

update(id:number,data:any){
const u = users.find(u=>u.id===id)
if(!u) return null
Object.assign(u,data)
return u
},

delete(id:number){
const u = users.find(u=>u.id===id)
if(!u) return false
u.deleted = true
return true
}

}