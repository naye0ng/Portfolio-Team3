#include <iostream>
#include <queue>
#include <tuple>
using namespace std;
int N, M;
int Map[10][10] = { 0 };
int dx[4] = { 0,0,-1,1 };
int dy[4] = { -1,1,0,0 };
int visited[10][10][2];
bool isWall(int x, int y) {
   return (x < 0 || y < 0 || x >= N || y >= N);
}
int find() {
   queue <tuple<int, int, int, int>> q;  // curx, cury, wallnum, statecheck,;
   q.push(make_tuple(0, 0, 0, 0));
   visited[0][0][0] = 0;
   while (!q.empty()) {
       int curx, cury, wallnum, check;
       tie(curx, cury, wallnum, check) = q.front();
       q.pop();
       for(int d=0;d<4;d++) {
           int newx = curx + dx[d];
           int newy = cury + dy[d];
           if (!isWall(newx, newy)) {
               if (Map[newx][newy] == 1) {
                   if (visited[newx][newy][wallnum]>visited[curx][cury][wallnum]+1) {
                       visited[newx][newy][wallnum] = visited[curx][cury][wallnum]+1;
                       q.push(make_tuple(newx, newy, wallnum, 0));
                   }
               } else if (Map[newx][newy] == 0) {
                   if (wallnum == 0 && check != 1){
                       int curt = visited[curx][cury][0]+1;
                       int time;
                       if (curt%M==0){
                           time = curt;
                       }
                       else{
                           time = curt+M-(curt%M);
                       }
                       if (visited[newx][newy][1]>time){
                           visited[newx][newy][1] = time;
                           q.push(make_tuple(newx, newy, 1, 1));
                       }
                   }
               } else if (Map[newx][newy] > 1) {
                   int curt = visited[curx][cury][wallnum]+1;
                   int newt = Map[newx][newy];
                   int time;
                   if (curt%newt==0){
                       time = curt;
                   }
                   else{
                       time = curt+newt-(curt%newt);
                   }
                   if (check != 1 && visited[newx][newy][wallnum]>time) {
                       visited[newx][newy][wallnum] = time;
                       q.push(make_tuple(newx, newy, wallnum, 1));
                   }
               }
           }
       }
   }
}
void refactor(){
   for(int i=0;i<N;i++){
       for(int j=0;j<N;j++){
           bool wflag=false, hflag=false;
           if (Map[i][j]==0) {
               for (int d = 0; d < 2; d++) {
                   if (!isWall(i + dx[d], j + dy[d]) && Map[i + dx[d]][j + dy[d]] != 1) {
                       wflag = true;
                       break;
                   }
               }
               for (int d = 2; d < 4; d++) {
                   if (!isWall(i + dx[d], j + dy[d]) && Map[i + dx[d]][j + dy[d]] != 1) {
                       hflag = true;
                       break;
                   }
               }
               if (wflag && hflag) {
                   Map[i][j] = -1;
               }
           }
       }
   }
}
int main() {
   cin >> N >> M;
   for (int i = 0; i < N; i++) {
       for (int j = 0; j < N; j++) {
           cin >> Map[i][j];
           visited[i][j][0] = 10000;
           visited[i][j][1] = 10000;
       }
   }
   refactor();
   find();
   if (visited[N-1][N-1][0] > visited[N-1][N-1][1]){
       cout << visited[N-1][N-1][1] << "\n";
   }
   else{
       cout << visited[N-1][N-1][0] << "\n";
   }
}