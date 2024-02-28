// Given a set of persons as graph
// where graph[i][j] indicates
// the amount that person i needs to
// pay person j, this function
// finds and prints the minimum
// cash flow to settle all debts.
function minimumTransactions(graph, indexToName) {
    let N = graph.length;
    let transactions = [];

    // A utility function that returns
    // index of minimum value in arr
    function getMin(arr) {
        let minInd = 0;
        for (let i = 1; i < N; i++) if (arr[i] < arr[minInd]) minInd = i;
        return minInd;
    }

    // A utility function that returns
    // index of maximum value in arr
    function getMax(arr) {
        let maxInd = 0;
        for (let i = 1; i < N; i++) if (arr[i] > arr[maxInd]) maxInd = i;
        return maxInd;
    }

    // A utility function to return minimum of 2 values
    function minOf2(x, y) {
        return x < y ? x : y;
    }

    // amount[p] indicates the net amount
    // to be credited/debited to/from person 'p'
    // If amount[p] is positive, then
    // i'th person will amount[i]
    // If amount[p] is negative, then
    // i'th person will give -amount[i]
    function minCashFlowRec(amount) {
        // Find the indexes of minimum and
        // maximum values in amount
        // amount[mxCredit] indicates the maximum amount
        // to be given (or credited) to any person .
        // And amount[mxDebit] indicates the maximum amount
        // to be taken(or debited) from any person.
        // So if there is a positive value in amount,
        // then there must be a negative value
        let mxCredit = getMax(amount),
            mxDebit = getMin(amount);

        // If both amounts are 0, then
        // all amounts are settled
        if (amount[mxCredit] == 0 && amount[mxDebit] == 0) return;

        // Find the minimum of two amounts
        let min = minOf2(-amount[mxDebit], amount[mxCredit]);
        amount[mxCredit] -= min;
        amount[mxDebit] += min;

        // If minimum is the maximum amount to be
        transactions.push({
            from: indexToName[mxDebit],
            to: indexToName[mxCredit],
            amount: min,
        });

        // Recur for the amount array.
        // Note that it is guaranteed that
        // the recursion would terminate
        // as either amount[mxCredit]  or
        // amount[mxDebit] becomes 0
        minCashFlowRec(amount);
    }

    // Create an array amount,
    // initialize all value in it as 0.
    let amount = Array.from({ length: N }, (_, i) => 0);

    // Calculate the net amount to
    // be paid to person 'p', and
    // stores it in amount[p]. The
    // value of amount[p] can be
    // calculated by subtracting
    // debts of 'p' from credits of 'p'
    for (let p = 0; p < N; p++)
        for (let i = 0; i < N; i++) amount[p] += graph[i][p] - graph[p][i];

    minCashFlowRec(amount);
    return transactions;
}

export default function getSettlement(data) {
    // Convert member names to indices 0 to N-1
    nameToIndex = {};
    let N = data.members.length;
    for (let i = 0; i < N; i++) nameToIndex[data.members[i]] = i;

    // Create a NxN adjacency matrix filled with 0s
    let graph = [];
    for (let r = 0; r < N; r++) {
        graph.push([]);
        for (let c = 0; c < N; c++) {
            graph[r].push(0);
        }
    }

    // Fill the adjacency matrix
    // G[i][j]=k means: j has paid k for i, and now i needs to pay k back to j
    for (let payment of data.payments) {
        for (let paidFor of payment.for) {
            let pBy = nameToIndex[payment.by];
            let pFor = nameToIndex[paidFor.name];
            graph[pFor][pBy] += paidFor.amount;
        }
    }

    return minimumTransactions(graph, data.members);
}
