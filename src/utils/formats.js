export function getLastUpdated(ms){
    let today = new Date().toLocaleDateString('en-Us',{month:'short',day:'numeric',year:'numeric'})  
    let lastUpdate = new Date(ms)
    let lastUpdateStr = lastUpdate.toLocaleDateString('en-Us',{month:'short',day:'numeric',year:'numeric'})   
    if(today === lastUpdateStr){
        const lastUpdateTime = lastUpdate.toLocaleTimeString('en-Us',{hour:'2-digit',minute:'2-digit',hour12:true});
        return `Last updated at ${lastUpdateTime}`
    }else{
       return `Last updated on ${lastUpdateStr}`
    }
}