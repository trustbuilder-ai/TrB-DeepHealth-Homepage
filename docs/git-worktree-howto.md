# How to handle git worktree

This guide provides concise item  hot to approach working on different branches in the same repo at the same time.

## Create worktree folders

```sh
new_branch="<branch-name>"
new_folder="<path-to-new-folder>"  # ../folder (!)
git worktree add -B ${new_branch} ${new_folder}  # [<base-branch|commit-ish>]
git worktree list
cd "../${new_folder}"
# add, commit, push
git worktree remove ../<path-to-folder>
# git worktree prune
```

## Integration testing (merge w/o commit)

```sh
git checkout main

# Merge feature branch without committing
# Could be combined with --no-ff
git merge --no-commit ${new_branch}

# Check staged changes
git status
git diff --staged

# Resolve conflicts (if any)
# Conflict markers (<<<<<<<, =======, >>>>>>>)
# Edit conflicted files, then: 
git add conflicted_file.txt

# git commit, git merge --abort
```

## Tips

- Each worktree is independent but shares the same .git repository
- Avoid checking out the same branch in multiple worktrees to prevent conflicts
- Ensure sufficient disk space, as each worktree duplicates the working files
- Commit or stash changes before removing a worktree
- Ensure the branch isn't active in another worktree
