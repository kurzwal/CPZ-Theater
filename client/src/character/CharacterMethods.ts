/**
 * Creates and adds an animation to the character.
 * @param character - this를 넣어주세요.
 * @param animsKey - 애니메이션의 key를 정의해주세요.
 * @param spritesKey - 기존에 불러온 sprite의 키를 넣어주세요.
 * @param frames - 몇 번 프레임을 사용할 지 배열로 넣어주세요.
 * @param animsDuration - 애니메이션의 속도를 ms단위로 받습니다. 기본값은 100 입니다.
 * @param repeat - 몇 번 반복할 지 넣어주세요. 기본값은 -1 (무한루프) 입니다.
 */
export function createAnims(
   character: Phaser.Physics.Arcade.Sprite,
   animsKey: string,
   spritesKey: string,
   frames: number[],
   animsDuration?: number,
   repeat?: number
) {
   const animationFrames: Phaser.Types.Animations.AnimationFrame[] = [];
   frames.forEach((frame) => {
      animationFrames.push({
         key: spritesKey,
         frame: frame,
         duration: animsDuration || 100,
      });
   });
   character.anims.create({
      key: animsKey,
      frames: animationFrames,
      repeat: repeat || -1,
   });
}
