const pie = 3.1428
const Formulas = {  
    
    one_minus_D(D){
        return 1 - D
    },
    r_load : {
        cf(values){
            let f = 50, mH = Math.pow(10, -3)
            let lmH = values.L * mH
            let val = Math.pow(values.R, 2) + Math.pow((2 * (2*pie*f) * lmH), 2)
            let lower = (4 * pie * f ) * Math.sqrt(val)

            let ans  = (10 / lower) * Math.pow(10, 6)
            return Number(ans).toFixed(4)
        },
        lf(values){
            //* value.D is rf
            let cfVal = this.cf(values) * Math.pow(10, -6)
            let f = 50
            let ans  = (
                (1 / values.D )+1) * 
                ( 
                    1 / ((Math.pow((4 * pie * f ), 2) * cfVal)
                )
            )
            ans = ans * Math.pow(10,3)
            return Number(ans ).toFixed(4)
        },
        vm(values){
            let ans  = values.vIn * Math.sqrt(2)
            return Number(ans).toFixed(4)
        },
        vdc(values){
            let ans = (2 * this.vm(values)) / pie
            return Number(ans).toFixed(4)
        },
        v2h(values){
            let ans = (4 * this.vm(values)) / (3 * Math.sqrt(2)* pie)
            return Number(ans).toFixed(4)
        },
        v02(values){
            let cfVal = this.cf(values) * Math.pow(10, -6)
            let lfVal = this.lf(values) * Math.pow(10, -3)
            let f = 50, w = 2 * pie * f
            let lower =( Math.pow((2*w ), 2) * lfVal * cfVal) - 1
            let ans = Math.abs((-1 / lower) * this.v2h(values) )
            return Number(ans).toFixed(4)
        },
        v0(values){
            let ans =  parseFloat(this.vdc(values)) + parseFloat(this.v02(values))
            console.log(ans)
            return Number(ans).toFixed(4)
        },
        idc(values){
            let ans = (2 * this.vm(values))/ (pie * values.R)
            return Number(ans).toFixed(4)
        },
        power(values){
            let ans =  parseFloat(this.v0(values)) * parseFloat(this.idc(values))
            return Number(ans).toFixed(4)
        },
    },
}
//* D is rf , vIn is vs, R is r
// L is the inductance
let values = {
    vIn:0,
    D:0,
    R:0,
    L:0,

}


//L  is 
function updateValues(vIn=0,D=0,R=0,L=0){
    values = {
        vIn:vIn,
        // convert alpha to radion
        D:D,
        R:R,
        L:L,
    }
}