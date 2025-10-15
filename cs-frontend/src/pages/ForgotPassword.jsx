import React from 'react'


export default function ForgotPassword() {
  return (
    <>
      <section>
      <h2 className='reset'>Reset your password</h2>
        <form>
          <input name="email" type="email" placeholder="Enter your email to reset your password" />
        </form>
      </section>
    </>
  );
}
