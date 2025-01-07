const calculateWaiver = (sscResult: number, hscResult: number) => {
    let waiver;
    
    switch (true) {
        case sscResult === 5.00 && hscResult === 5.00:
            waiver = 80;
            break;
        
        case sscResult === 5.00 && (hscResult >= 4.75 && hscResult <= 4.95):
            waiver = 60;
            break;
    
        case (sscResult >= 4.75 && sscResult <= 4.95) && (hscResult >= 4.75 && hscResult <= 4.95):
            waiver = 50;
            break;

        case (sscResult >= 4.50 && sscResult < 4.75) && (hscResult >= 4.50 && hscResult < 4.75):
            waiver = 30;
            break;

        case (sscResult >= 4.50 && sscResult <= 4.65) && (hscResult >= 4.50 && hscResult <= 4.65):
            waiver = 25;
            break;

        default:
            waiver = 0.00;
    }

    return waiver;
};


export default calculateWaiver;