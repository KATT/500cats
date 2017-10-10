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
      <div className={`wrapper ${loading ? 'is-loading' : ''}`}>
        <pre dangerouslySetInnerHTML={{ __html: KATTCORP_LOGO }} />
      </div>

      <style jsx>{`
        .wrapper {
          position: fixed;
          right: 0px;
          top: 0px;
          text-shadow: 1px 1px 1px white;
          transform: translateX(150%) translateY(-150%);
          transition: transform 0.2s ease;
        }
        .wrapper.is-loading {
          transform: translateX(0%) translateY(0%);
        }
        pre {
          animation-duration: 0.3s;
          animation-name: updown;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          padding: 0;
          margin: 10px;
        }
        @keyframes updown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(15px);
          }
        }
      `}</style>
    </div>
  );
};

export default () => (
  <LoadingState>{({ loading }) => <Bar loading={loading} />}</LoadingState>
);
