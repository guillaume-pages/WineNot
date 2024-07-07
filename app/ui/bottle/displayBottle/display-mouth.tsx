export const DisplayMouth = ({ mouthDescription }: { mouthDescription: number[] | undefined }) => {
  return (
    <div>
      <h2>Bouche</h2>
      <p>{mouthDescription}</p>
    </div>
  );
}