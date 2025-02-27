// Javascript implementation of the above approach. 
class MaxAsignacion {

    constructor(){
        
        // cost matrix
        this.cost = new Array(31).fill().map(() => new Array(31).fill(0));
        
        this.n = 0; //n workers and n jobs
        this.max_match = 0;
        this.lx = new Array(31).fill(0);
        this.ly = new Array(31).fill(0);
        this.xy = new Array(31).fill(-1);  
        this.yx = new Array(31).fill(-1);  
        this.S = new Array(31).fill(false);
        this.T = new Array(31).fill(false);
        this.slack = new Array(31).fill(0);
        this.slackx = new Array(31).fill(0);
        this.prev_ious = new Array(31).fill(-1);
    }

    getAssignments() {
        // Asegúrate de que este método devuelve las asignaciones correctamente
        let assignments = [];
        for (let worker = 0; worker < this.n; worker++) {
            if (this.xy[worker] !== -1) {
                assignments.push({ job: this.xy[worker], worker });
            }
        }
        return assignments;
    }
  
    init_labels()
    {
        for(let i = 0; i < this.lx.length; i++) this.lx[i] = 0;
        for(let i = 0; i < this.ly.length; i++) this.ly[i] = 0;
        
        for (let x = 0; x < this.n; x++)
            for (let y = 0; y < this.n; y++)
                this.lx[x] = Math.max(this.lx[x], this.cost[x][y]);
    }
    
     
    update_labels()
    {
        let delta = Infinity;
        for (let y = 0; y < this.n; y++) {
            if (!this.T[y]) delta = Math.min(delta, this.slack[y]);
        }

        for (let x = 0; x < this.n; x++) {
            if (this.S[x]) this.lx[x] -= delta;
        }

        for (let y = 0; y < this.n; y++) {
            if (this.T[y]) this.ly[y] += delta;
        }

        for (let y = 0; y < this.n; y++) {
            if (!this.T[y]) this.slack[y] -= delta;
        }
    }
    
    
    add_to_tree(x, prev_iousx) 
    //x - current vertex,prev_iousx - vertex from X before x in the alternating path,
    //so we add edges (prev_iousx, xy[x]), (xy[x], x)
    {
        this.S[x] = true; //add x to S
        this.prev_ious[x] = prev_iousx; //we need this when augmenting
        for (let y = 0; y < this.n; y++) //update slacks, because we add new vertex to S
            if (this.lx[x] + this.ly[y] - this.cost[x][y] < this.slack[y])
            {
                this.slack[y] = this.lx[x] + this.ly[y] - this.cost[x][y];
                this.slackx[y] = x;
            }
    }
    
    
    // getAssignments() {
    //     let assignments = [];
    //     for (let worker = 0; worker < this.n; worker++) {
    //         if (this.xy[worker] !== -1) {
    //             assignments.push({job: this.xy[worker] , worker});
    //         }
    //     }
    //     return assignments;
    // }
    augment() {
        if (this.max_match == this.n) return;

        let x = 0, y = 0, root = 0;
        let q = new Array(31);
        let wr = 0, rd = 0;

        for (let i = 0; i < this.S.length; i++) this.S[i] = false;
        for (let i = 0; i < this.T.length; i++) this.T[i] = false;
        for (let i = 0; i < this.prev_ious.length; i++) this.prev_ious[i] = -1;

        for (x = 0; x < this.n; x++) {
            if (this.xy[x] == -1) {
                q[wr++] = root = x;
                this.prev_ious[x] = -2;
                this.S[x] = true;
                break;
            }
        }

        for (y = 0; y < this.n; y++) {
            this.slack[y] = this.lx[root] + this.ly[y] - this.cost[root][y];
            this.slackx[y] = root;
        }

        while (true) {
            while (rd < wr) {
                x = q[rd++];
                for (y = 0; y < this.n; y++) {
                    if (this.cost[x][y] == this.lx[x] + this.ly[y] && !this.T[y]) {
                        if (this.yx[y] == -1) break;
                        this.T[y] = true;
                        q[wr++] = this.yx[y];
                        this.add_to_tree(this.yx[y], x);
                    }
                }
                if (y < this.n) break;
            }
            if (y < this.n) break;

            this.update_labels();

            wr = rd = 0;
            for (y = 0; y < this.n; y++) {
                if (!this.T[y] && this.slack[y] == 0) {
                    if (this.yx[y] == -1) {
                        x = this.slackx[y];
                        break;
                    } else {
                        this.T[y] = true;
                        if (!this.S[this.yx[y]]) {
                            q[wr++] = this.yx[y];
                            this.add_to_tree(this.yx[y], this.slackx[y]);
                        }
                    }
                }
            }
            if (y < this.n) break;
        }

        if (y < this.n) {
            this.max_match++;
            for (let cx = x, cy = y, ty; cx != -2; cx = this.prev_ious[cx], cy = ty) {
                ty = this.xy[cx];
                this.yx[cy] = cx;
                this.xy[cx] = cy;
            }
            this.augment();
        }
    }
     
    hungarian()
    {
        let ret = 0; //weight of the optimal matching
        this.max_match = 0; //number of vertices in current matching
        for(let i= 0; i < this.xy.length; i++) this.xy[i] = -1;
        for(let i = 0; i < this.yx.length; i++) this.yx[i] = -1;
        this.init_labels(); //step 0
        this.augment(); //steps 1-3
        
        for (let x = 0; x < this.n; x++){ //forming answer there
            ret += this.cost[x][this.xy[x]];
            console.log("Costo: ", this.cost[x][this.xy[x]]);
        }
            
        
        return ret;
    }
    
    assignmentProblem(Arr, N) {
        
        this.n = N;
        for(let i=0; i<this.n; i++){
            for(let j=0; j<this.n; j++){
                this.cost[i][j] = Arr[i*this.n+j];
            }
        }
        let ans = this.hungarian();
        
        return ans;
    }
}


export default MaxAsignacion;
// The code is contributed by Arushi Jindal. 
 

