import { termLogger } from 'causal-net.log';

termLogger.log('this is text');
termLogger.log({'name':'this is text'});

termLogger.log({'father':{'name':'this is text','alias':'this is another text'}});
termLogger.log({'father':{'name':{sub:'this is text'},'alias':'this is another text'}});
termLogger.log({'array':[0,1,2,3,4]});
termLogger.log({'array':[{a:0}, {b:1}, {c:2},  {d:4},  {e:6}]});

termLogger.Level = 'debug';
console.log(termLogger.Level);
termLogger.log({'not to show': true});
termLogger.Level = 'log';
console.log(termLogger.Level);

termLogger.progressBegin(5);
for(let i of [1,2,3,4,5]){
    termLogger.progressUpdate({current: i});
}
termLogger.progressEnd();

termLogger.groupBegin('group A');
termLogger.groupBegin('group B');
termLogger.groupBegin('group C');
termLogger.groupEnd();
termLogger.groupEnd();
termLogger.groupEnd();

