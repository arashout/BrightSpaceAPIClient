export class Timer {
    tickInterval = 1000;
    /**
     * Count down timer class
     * @param fn Callback function called on every tick with the difference between 
     * now and endDate as a parameter
     * @param endDate 
     */
    constructor(fn: Function, endDate: Date) {
        // Update the count down every 1 second
        let ticker = setInterval(function () {

            // Get todays date and time
            let now = new Date();
            // Find the distance between now an the count down date
            let difference = endDate.valueOf() - now.valueOf();

            fn(difference);

            // If the count down is finished, stop setInterval
            if (difference < 0) {
                clearInterval(ticker);
            }
        }, this.tickInterval);
    }
}