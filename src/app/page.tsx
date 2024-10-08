import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Protection Portal</h1>
        <p className={styles.subtitle}>
          Welcome to the Protection Portal. Start by getting a quote and proceed
          with the payment.
        </p>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.center}>
        <a href='/quotes/new' className={styles.card}>
          <h2>
            Create a Quote <span>-&gt;</span>
          </h2>
          <p>Estimate the cost of your protection.</p>
        </a>
        <a href='/admin' className={styles.card}>
          <h2>
            Admin Panel <span>-&gt;</span>
          </h2>
          <p>View policies and process refunds.</p>
        </a>
      </div>

      <section id='quote' className={styles.section}>
        <h2>Get a Quote</h2>
        <p>Here, you will be able to get a quote for your protection.</p>
      </section>

      <section id='payment' className={styles.section}>
        <h2>Proceed to Payment</h2>
        <p>Complete the payment to activate your policy.</p>
      </section>

      <section id='refund' className={styles.section}>
        <h2>Request a Refund</h2>
        <p>If needed, request a refund here.</p>
      </section>
    </main>
  )
}
