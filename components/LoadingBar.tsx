import LoadingState, { RouterState } from './LoadingState';

function getClassName(loading: boolean) {
  return loading ? 'bar is-loading' : 'bar';
}

const KATTCORP_LOGO = `\
<!--googleoff: index-->\
             / )
 / )__/ )___/ /
( @ . @ )     )
 (           )
 //"//""//"//
<!--googleon: index-->
WE ARE LOADING..`;

const Bar = ({ loading }: { loading: boolean }) => {
  return (
    <div>
      <pre
        dangerouslySetInnerHTML={{ __html: KATTCORP_LOGO }}
        className={loading ? 'is-loading' : null}
      />

      <style jsx>{`
        pre {
          position: fixed;
          right: 10px;
          top: 10px;
          padding: 0;
          margin: 0;
          text-shadow: 1px 1px 1px white;

          transform: translate(0, -200%);
        }
        pre.is-loading {
          transform: translate(0, 0);
        }
      `}</style>
    </div>
  );
};

export default () => (
  <LoadingState>{({ loading }) => <Bar loading={loading} />}</LoadingState>
);
