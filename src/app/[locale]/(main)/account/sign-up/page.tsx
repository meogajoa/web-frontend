'use client';

const SignUpPage = () => {
  return (
    <div>
      <button
        onClick={() => {
          fetch('/api/auth/sign-up', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              nickname: '배종찬',
              email: 'jongchan@gmail.com',
              password: '1234',
            }),
          })
            .then((res) => {
              console.log('res: ', res);

              if (res.ok) {
                return res.json();
              }
            })
            .then((data) => {
              console.log('data: ', data);
            })
            .catch((error) => {
              console.error('error: ', error);
            });
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default SignUpPage;
