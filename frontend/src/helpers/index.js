
module.exports = {
    convert_date(date_us){
        if(!date_us)return "-";

        let date_br = date_us.toString();
        let vet = date_br.split('-');
        date_br = vet[2]+'/'+vet[1]+'/'+vet[0];

        return date_br;
    },

    calculate_age(date){
        if(!date)return " sem informação"

        date = date.toString();
        let vet = date.split('-');
        var data = new Date();
        let D = parseInt(data.getDate());
        let M = parseInt(data.getMonth()+1);
        let Y = parseInt(data.getFullYear());
        let d = parseInt(vet[2]);
        let m = parseInt(vet[1]);
        let y = parseInt(vet[0]);

        let X = ((Y*365)+(M*30)+D);
        let x = ((y*365)+(m*30)+d);

        let age = Math.trunc((X-x)/365);
        return age+' anos';
    }
}