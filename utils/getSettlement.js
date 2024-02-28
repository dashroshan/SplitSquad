class Solver {
    minimum(arr, n) {
        let idx = 0;
        let m = 1000000002;

        for (let i = 0; i < n; i++) {
            if (arr[i] < m) {
                m = arr[i];
                idx = i;
            }
        }
        return idx;
    }

    maximum(arr, n) {
        let idx = 0;
        let m = -1000000002;

        for (let i = 0; i < n; i++) {
            if (arr[i] > m) {
                m = arr[i];
                idx = i;
            }
        }
        return idx;
    }

    minCashFlow(transaction, n) {
        // Net amount of Every friend
        let netAmount = Array(n).fill(0);

        // Fill the amount array
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                netAmount[i] += transaction[j][i] - transaction[i][j];
            }
        }

        // To store total '0' in 'netAmount' array
        let numberOfZero = 0;

        for (let i = 0; i < n; i++) {
            if (netAmount[i] === 0) {
                numberOfZero += 1;
            }
        }

        // 2-D array to store answer
        let answer = Array.from({ length: n }, () => Array(n).fill(0));

        // Iterate the step until all the elements of array is not '0'
        while (numberOfZero !== n) {
            let minAmountIdx = this.minimum(netAmount, n);
            let maxAmountIdx = this.maximum(netAmount, n);

            // Receiver has more amount than sender
            if (netAmount[maxAmountIdx] > Math.abs(netAmount[minAmountIdx])) {
                answer[minAmountIdx][maxAmountIdx] = Math.abs(
                    netAmount[minAmountIdx]
                );
                netAmount[maxAmountIdx] =
                    netAmount[maxAmountIdx] - Math.abs(netAmount[minAmountIdx]);
                netAmount[minAmountIdx] = 0;
            }
            // Receiver has less amount than sender
            else if (
                netAmount[maxAmountIdx] < Math.abs(netAmount[minAmountIdx])
            ) {
                answer[minAmountIdx][maxAmountIdx] = netAmount[maxAmountIdx];
                netAmount[minAmountIdx] =
                    netAmount[minAmountIdx] + netAmount[maxAmountIdx];
                netAmount[maxAmountIdx] = 0;
            }
            // Receiver has equal amount compared to sender
            else {
                answer[minAmountIdx][maxAmountIdx] = Math.abs(
                    netAmount[minAmountIdx]
                );
                netAmount[maxAmountIdx] = 0;
                netAmount[minAmountIdx] = 0;
                numberOfZero += 1;
            }

            numberOfZero += 1;
        }

        return answer;
    }
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

    let solver = new Solver();
    let solution = solver.minCashFlow(graph, N);
    let transactions = [];
    for (let payer = 0; payer < N; payer++) {
        for (let receiver = 0; receiver < N; receiver++) {
            if (solution[payer][receiver] > 0)
                transactions.push({
                    from: data.members[payer],
                    to: data.members[receiver],
                    amount: solution[payer][receiver],
                });
        }
    }

    return transactions;
}
