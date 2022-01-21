/* Formatting Functions below */

export const NumberFormat = (n) => {
    var val = Math.round(Number(n) * 100) / 100;
    var parts = val.toString().split(".");
    var num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    return num
}

export default {
    NumberFormat
}